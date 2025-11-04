import React from 'react'

const Search = ({ searchTrm, setSearchTrm }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTrm}
          onChange={(e) => setSearchTrm(e.target.value)}
        />
      </div>
    </div>
  )
}
export default Search