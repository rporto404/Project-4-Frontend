import React, {useState} from 'react'

const Search = ({ term, searchKeyword}) => {

   const handleSearch = (e) => {
      searchKeyword(e.target.value)
   }

   return (
      <>
         <input type="text" value={term} placeholder="Enter a book name!" onChange={handleSearch}></input>
      </>
   )
}

export default Search
