import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task}) => {
  const [cookies, setCookies, removeCookies] = useCookies(null)
  const editMode = mode === 'edit' ? true:false
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50, 
    date: editMode ? task.date : new Date()
  })
  console.log(mode)
  console.log('NEW DATA', data)

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if(response.status === 200) {
        console.log('IT WORKED! YEET!')
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if(response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }

  }


  
  const handleChange = (e) => {
    console.log('changing', e)
    const {title, value} = e.target

    setData(data => ({
      ...data,
      [title]: value
    }))
    console.log('CHANGED DATA', data)
  }
  
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Sure, let's {mode} ANOTHER thing to worry about...</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input className="input"
            required 
            maxLength={30}
            type="text" 
            placeholder=" What now?"
            title= "title"
            value= {data.title} 
            onChange={handleChange}
          />
          <br/>
          <label for="range">Select how far through this fool's errand you are...</label>
          <input className="input"
            required
            type="range" 
            id="range"
            min="0"
            max="100"
            title="progress"
            value={data.progress}
            onChange={handleChange} 
          />
          <input className={mode} type="submit" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
      )
  };

export default Modal;