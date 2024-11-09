import { Link, useNavigate } from 'react-router-dom';  // Update this line
import { getDocs, collection, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState(null);
  const [editArticle, setEditArticle] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '' });
  const navigate = useNavigate();  


  useEffect(() => {
    const ref = collection(db, 'articles');
    
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setArticles(results);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id);
    await deleteDoc(ref);
  };

  const handleEdit = (article) => {
    setEditArticle(article);
    setFormData({
      title: article.title,
      author: article.author,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editArticle) return;

    const articleRef = doc(db, 'articles', editArticle.id);
    await updateDoc(articleRef, formData);
    setEditArticle(null);
    navigate('/'); 
  };

  return (
    <div className="home">
      <h2>Articles</h2>

      {articles && articles.map((article) => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          
          {/* Edit Button */}
          <button onClick={() => handleEdit(article)}>Edit Article</button>

          {/* Delete Button */}
          <img
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon}
            alt="delete icon"
          />
        </div>
      ))}

      {/* Edit Form */}
      {editArticle && (
        <div className="edit-form">
          <h3>Edit Article</h3>
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
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditArticle(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
