import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../firebase/config'
// styles
import './create.css'

export default function Create() {  
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [description, setDescription] = useState('')
  const title = useRef(null)
  const author = useRef(null)
  const description = useRef(null)
  
  const navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault()   
    const article = {
      title: title.current.value,
      author: author.current.value,
      description: description.current.value};
    const ref = collection(db, 'articles')
    await addDoc(ref,article)

    // setTitle("");
    // setAuthor("");
    // setDescription("");

    navigate('/')
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Article</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Title:</span>
          <input 
            type="text" 
            //onChange={(e) => setTitle(e.target.value)}
            //value={title}
            ref = {title}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            //onChange={(e) => setAuthor(e.target.value)}
            //value={author}
            ref = {author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            //onChange={(e) => setDescription(e.target.value)}
            //value={description}
            ref = {description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}