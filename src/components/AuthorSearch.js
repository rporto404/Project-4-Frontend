import React, {useState} from 'react'

const AuthorSearch = ({ term, searchKeyword}) => {

   const handleAuthorSearch = (e) => {
      searchKeyword(e.target.value)
   }
   
   return (
      <>
         <input type="text" value={term} placeholder="Enter an author by last name!" onChange={handleAuthorSearch}></input>
      </>
   )
}

export default AuthorSearch
