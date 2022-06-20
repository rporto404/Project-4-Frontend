import React, { useState } from 'react'


const Add = (props) => {
  let emptyBook = { title: '', author: '', genre: '', year: '', publisher: '' }
  const [book, setBook] = useState(emptyBook)

  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(book)
    setBook({ title: '', author: '', genre: '', year: '', publisher: '' })
  }
  return (
    <>
    <div className='d-flex flex-column justify-center m-auto'>
      <details className='color-white'>
        <summary><h3>Add New Book</h3></summary>
          <form className='d-flex flew-row align-items-center flex-wrap justify-center' onSubmit={handleSubmit}>
            <input className='mx-1' type="text" name="title" value={book.title} placeholder='Title' onChange={handleChange} />
            <br />
            <input className='mx-1' type="text" name="author" value={book.author} placeholder='Author' onChange={handleChange} />
            <br />
            <input className='mx-1' type="text" name="genre" value={book.genre} placeholder='Genre' onChange={handleChange} />
            <br />
            <input className='mx-1' type="text" name="year" value={book.year} placeholder='Year (YYYY)' onChange={handleChange} />
            <br />
            <input className='mx-1' type="text" name="publisher" value={book.publisher} placeholder='Publisher' onChange={handleChange} />
            <br/>
            <br/>
            <input className='btn btn-success' type="submit"/>
          </form>
      </details>
      </div>
    </>
  )
}

export default Add
