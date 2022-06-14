import React, {useState, useEffect} from 'react'

const Edit = (props) => {
   const [book, setBook] = useState({ ...props.book})

   const handleChange = (event) => {
      setBook({ ...book, [event.target.name]: event.target.value })
   }
   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleUpdate(book)
   }

   return (
      <>
         <details>
            <summary>Edit Book</summary>
            <form onSubmit={handleSubmit}>
              <label>Title: </label>
              <input type="text" name="title" value={book.title} onChange={handleChange}/>
              <br/>
              <br/>
              <label>Author: </label>
              <input type="text" name="author" value={book.author} onChange={handleChange}/>
              <br/>
              <br/>
              <label>Genre: </label>
              <input type="text" name="genre" value={book.genre} onChange={handleChange}/>
              <br/>
              <br/>
              <label>Year: </label>
              <input type="number" name="year" value={book.year} onChange={handleChange}/>
              <br/>
              <br/>
              <label>Publisher: </label>
              <input type="text" name="publisher" value={book.publisher} onChange={handleChange}/>
              <input type="submit" />
            </form>
         </details>
      </>
   )
}

export default Edit
