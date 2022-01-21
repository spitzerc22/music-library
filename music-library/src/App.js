import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gallery from './Gallery'
import SearchBar from './Searchbar'
import AlbumView from './AlbumView'
import ArtistView from './ArtistView'

function App() {
let [searchTerm, setSearchTerm] = useState('')
let [data, setData] = useState([])
let [message, setMessage] = useState('Search for Music!')


const handleSearch = (e, term) => {
  e.preventDefault()
  setSearchTerm(term)
}

useEffect(() => {
    const API_URL = `https://itunes.apple.com/search?term=`
    if (searchTerm) {
    document.title=`${searchTerm} Music`
    const fetchData = async () => {
        const response = await fetch(API_URL + searchTerm)
        const resData = await response.json()
        if(resData.results.length > 0) {
        setData(resData.results)
        } else {
        setMessage('Not Found')
        }
    }
    fetchData()
}
}, [searchTerm])



return (
  <div className="App">
  {message}
    <Router>
      <Routes>
          <Route path="/" element={
            <div>
          <SearchBar handleSearch={handleSearch} /> <Gallery data={data} />
          </div>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
    </Router>
  </div>
);
}

export default App;
