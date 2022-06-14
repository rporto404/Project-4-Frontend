import React, {useState, useEffect} from 'react'

const Add = (props) => {
   let emptyBook = {title: '', author: '', genre: '', year: '', publisher: ''}
   const [book, setBook] = useState(emptyBook)

   const handleChange = (event) => {
      setBook({ ...book, [event.target.title]: event.target.value })
   }
   const handleSubmit = (event) => {
      event.preventDefault()
      props.handleCreate(book)
   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" onChange={handleChange}/>
            <br/>
            <br/>
            <label htmlFor="author">Author: </label>
            <input type="text" name="author" onChange={handleChange}/>
            <br/>
            <br/>
            <label htmlFor="genre">Genre: </label>
            <input type="text" name="genre" onChange={handleChange}/>
            <br/>
            <br/>
            <label htmlFor="year">Year: </label>
            <input type="number" name="year" onChange={handleChange}/>
            <br/>
            <br/>
            <label htmlFor="publisher">Publisher: </label>
            <input type="text" name="publisher" onChange={handleChange}/>
            <input type="submit"/>
         </form>
      </>
   )
}
