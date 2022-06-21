import React, {useState} from 'react'

const Search = ({ term, searchKeyword}) => {

   const handleSearch = (e) => {
      searchKeyword(e.target.value)
   }

   return (
      <>
        <div>
          <h5>Search for a Tolkien related keyword!</h5>
          <input className=''type="text" value={term} placeholder="Search..." onChange={handleSearch}></input>
         </div>
      </>
   )
}

export default Search
