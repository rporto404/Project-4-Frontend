import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import Search from './components/Search'
import AuthorSearch from './components/AuthorSearch'

const App = () => {
  const [books, setBooks] = useState([])
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [bookAuthor, setBookAuthor] = useState('')

  const getBooks = () => {
    axios
    .get('https://floating-fortress-76589.herokuapp.com/api/books')
    .then(
      (response) => setBooks(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

  const handleCreate = (addBook) => {
    axios
    .post('https://floating-fortress-76589.herokuapp.com/api/books', addBook)
    .then((response) => {
      setBooks([...books, response.data])
      // getBooks()
    })
  }

  const handleUpdate = (editBook) => {
    axios
    .put('https://floating-fortress-76589.herokuapp.com/api/books/' + editBook.id, editBook)
    .then((response) => {
      setBooks(books.map((book) => {
        return book.id !== response.data.id ? book : response.data
      }))
      // getPeople()
    })
  }

  const handleDelete = (event, deletedBook) => {
    axios
    .delete('https://floating-fortress-76589.herokuapp.com/api/books/' + deletedBook.id)
    .then((response) => {
      setBooks(books.filter(book => book.id !== deletedBook.id))
      // getPeople()
    })
  }

  useEffect(() => {
    getBooks()
  }, [])

  useEffect(() => {
     setLoading(true)
     fetch(`http://openlibrary.org/search.json?author=tolkien`)
     .then((response) => response.json())
     .then((data) => setData(data))
     .then(() => setLoading())
     .catch(setError)
  }, [])

  const bookAuthorHandler = (e) => {
     setBookAuthor(e.target.value)
  }

  if(loading) {
     return <h1>Loading...</h1>
  }

  if(error){
    return <pre>{JSON.stringify(error, null, 2)}</pre>
}
   if(!data){
      return null
   }

   let array = data.docs

   const authorSearchHandler = (search) => {

   }

   const searchHandler = (search) => {
      setSearch(search)
      if(search !== ''){
         const newBookList = array.filter((bookResult) => {
            return Object.values(bookResult)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())

         })
         setSearchResults(newBookList)
      } else {
         setSearchResults(array)
      }
   }

  return (
    <>
      <h1>List of Books</h1>
      <Add handleCreate={handleCreate} />
      <div className="books">
        {books.map((book) => {
          return (
            <div className="book" key={book.id}>
              <h4>Title: {book.title}</h4>
              <h5>Author: {book.author}</h5>
              <h5>Genre: {book.genre}</h5>
              <h5>Year: {book.year}</h5>
              <h5>Publisher: {book.publisher}</h5>
              <Edit handleUpdate={handleUpdate} book={book} />
              <button onClick={(event) => {handleDelete(event, book)}} value={book.id}>
                X
              </button>
            </div>
          )
        })}
      </div>
      <div>
         <AuthorSearch bookAuthorHandler={bookAuthorHandler} bookAuthor={bookAuthor}/>
         <Search term={search} searchKeyword={searchHandler}/>
         {search.length < 1 ?
         <ul>
            {array.map((item, i, a, b, c) => {
               return (
                  <>
                     <li key={i}>{item.title}</li>
                     <li key={a}>{item.author_name}</li>
                     <li key={b}>{item.first_publish_year}</li>
                  </>
            )
            })}
         </ul>
         :
         <ul>
            {searchResults.map((item, i) => {
               return (
               <li key={i}>{item.title}</li>
            )
            })}
         </ul>
         }
      </div>
    </>
  )
}

export default App;
