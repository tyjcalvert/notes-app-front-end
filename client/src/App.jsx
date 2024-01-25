import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [todo, setTodo] = useState('')
  const [data, setData] = useState([])

  const handleInputChange = (e) => {
    setTodo(e.target.value)
  }

  const getData = async () => {
    try {
      console.log(import.meta.env);
      const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}/api/notes`)
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddTodo = async (todo) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_ENDPOINT}/api/notes`, { title: todo })
      console.log(response)
      getData();
    } catch (error) {
      console.error(error)
    }
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
            <div style={{ backgroundColor: "#3B3B3B", borderRadius: "4px", padding: "4px", marginBottom: "4px", display: "flex", justifyContent: "space-around" }} key={index}>
              <div><h3>ToDo: {item.title}</h3></div><input type='checkbox'checked={item.isComplete}/>
            </div>
          )
        })}
      </div>
      <div className="input-container">
        <input name="todo-input" value={todo} onChange={handleInputChange}/>
        <button onClick={() => handleAddTodo(todo)}>
          Add ToDo
        </button>
      </div>
    </>
  )
}

export default App
