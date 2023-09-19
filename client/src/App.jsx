import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      console.log(import.meta.env);
      const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}/api/notes`)
      setData(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div>
        {/* <textarea defaultValue={data} disabled name="data" id="" cols="30" rows="10"/> */}
        {data.map((item, index) => {
          return (
            <div style={{ backgroundColor: "#3B3B3B", borderRadius: "4px", padding: "4px", display: "flex", justifyContent: "space-around" }} key={index}>
              <div><h3>ToDo: {item.title}</h3></div><input type='checkbox'/>
            </div>
          )
        })}
      </div>
      <div className="input-container">
        <input name="url-input" value={url} onChange={handleUrlChange}/>
        <button onClick={() => getData(url)}>
          Add ToDo
        </button>
      </div>
    </>
  )
}

export default App
