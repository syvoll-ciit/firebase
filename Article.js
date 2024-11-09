import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default function Article() {
  const { urlId } = useParams();  
  const navigate = useNavigate(); 

  const [article, setArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", description: "" });


  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, "articles", urlId);  
      const snapshot = await getDoc(ref);  

      if (snapshot.exists()) {
        setArticle({ id: snapshot.id, ...snapshot.data() });
        setFormData({
          title: snapshot.data().title,
          author: snapshot.data().author,
          description: snapshot.data().description,
        });
      } else {
        setTimeout(() => {
          navigate("/");  
        }, 2000);
      }
    };

    fetchArticle();
  }, [urlId, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleRef = doc(db, "articles", urlId);
    await updateDoc(articleRef, formData);
    setArticle((prev) => ({
      ...prev,
      ...formData,
    }));
    setEditMode(false); 
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      {!article ? (
        <p>Loading article...</p>
      ) : (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p><strong>By:</strong> {article.author}</p>

          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={toggleEdit}>Cancel</button>
            </form>
          ) : (
            <div>
              <p>{article.description}</p>
              <button onClick={toggleEdit}>Edit Article</button>
            </div>
          )}

          {/* Back to home button */}
          <button onClick={handleBack}>Back to Articles</button>
        </div>
      )}
    </div>
  );
}
