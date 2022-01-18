import Gallery from './Gallery';
import Searchbar from './Searchbar';
import {useState, useEffect, useRef} from 'react'
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';
import './App.css'



const App = () => {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}

  return (
      <div>
        <SearchContext.Provider value={{
          term: searchInput,
          handleSearch: handleSearch
        }}>
            <Searchbar />
        </SearchContext.Provider>
          {message}
          <DataContext.Provider value={data}>
            <Gallery />
          </DataContext.Provider>
          
      </div>
  )
}

export default App
