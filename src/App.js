import React from 'react'
import  {useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
import { useState } from 'react'
const socket = io.connect('https://quiz-socket.herokuapp.com/')
socket.emit('message', 'how are you')

function App() {
  const [username, setUsername] = useState('')
  const [ans1,setAns1] = useState('')
  const [ans2,setAns2] = useState('')
  const [ans3,setAns3] = useState('')
  const [ans4,setAns4] = useState('')
  const [ans5,setAns5] = useState('')
  const [flag,setFlag] = useState(false)
  const [mark,setMark] = useState('')
  const [page,setPage] = useState(1)
  const [timer,setTimer] = useState(120)

const handleUsername = (e) => {
    setUsername(e.target.value)
    socket.emit('username', username)
    setPage(2)
    setFlag(true)
  }


const handleSubmit = (e) => {
  e.preventDefault()
  socket.emit('answer',[ans1,ans2,ans3,ans4,ans5])
  socket.on('total', (mark) => {
    setMark(mark)
  })
  socket.emit('display',username)
  setPage(0)
}
useEffect(() => {
  if(timer === 0){
    const autoSubmit = () => {
      socket.emit('answer',[ans1,ans2,ans3,ans4,ans5])
      socket.on('total', (mark) => {
        setMark(mark)
      })
      setPage(0)
    }
    autoSubmit()
  }
})
if(flag){
  const handleTimer = () => {
    setTimeout(() => {
      setTimer(timer - 1)
    },1000)
  }
  if (timer !== 0){
    handleTimer()
  
  }
}



  return (
    <div className="App">
     <div className="container">
      {/* username */}
      {page === 1 ? (
        <div className="username">
          <h1>Quiz App</h1>
          <h1>Enter your name</h1>
          <form onSubmit={(e) => handleUsername(e)}>
            <input id='name' required="true" type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
        { page === 2 ?
        
        <form id="form" onSubmit={handleSubmit}  >
          <h1>Quiz</h1>
        <div className="question">
          <h2>Timer: {timer < 16? <span style={{color:"red"}}>{timer}</span> : <span>{timer}</span>}</h2>
         {/* <h2>{timer < 16? 'Timer: ' : ''} <h3 style={{color:"red"}}>{timer < 16? timer: ''}</h3></h2> */}
          <h2>Question 1</h2>
          <p>What are the types of dataflow in data communication?</p>
          <textarea onChange={e => {setAns1(e.target.value)}}></textarea>
          <h2>Question 2</h2>
          <p>Define MAC address?</p>
          <textarea onChange={e => {setAns2(e.target.value)}}></textarea>
          <h2>Question 3</h2>
          <p>What is physical layer?</p>
          <textarea onChange={e => {setAns3(e.target.value)}}></textarea>
          <h2>Question 4</h2>
          <p>What is the pdu of data link layer?</p>
          {/* <textarea onChange={e => {setAns4(e.target.value)}}></textarea> */}
          {/* radio button*/}
          <input type="radio" id="a1" name="a" value="bits" onChange={e => {setAns4(e.target.value)}}/>
          <label for="a">Bits</label>
          <input type="radio" id="b1" name="a" value="frames" onChange={e => {setAns4(e.target.value)}}/>
          <label for="b">Frames</label>
          <input type="radio" id="c1" name="a" value="packets" onChange={e => {setAns4(e.target.value)}}/>
          <label for="c">Packets</label>
          <input type="radio" id="d1" name="a" value="segments" onChange={e => {setAns4(e.target.value)}}/>
          <label for="d">Segments</label>
          
          <h2>Question 5</h2>
          <p>How many bits are there in MAC address?</p>
          <input type="radio" id="a" name="b" value="12" onChange={e => {setAns5(e.target.value)}}/>
          <label for="a">12</label>
          <input type="radio" id="b" name="b" value="24" onChange={e => {setAns5(e.target.value)}}/>
          <label for="b">24</label>
          <input type="radio" id="c" name="b" value="36" onChange={e => {setAns5(e.target.value)}}/>
          <label for="c">36</label>
          <input type="radio" id="d" name="b" value="48" onChange={e => {setAns5(e.target.value)}}/>
          <label for="d">48</label>
          {/* <textarea onChange={e => {setAns5(e.target.value)}}></textarea> */}
        </div>
        <button className='submit'>Submit</button>
      </form>
       
       : 
        page === 0 ?
      <div className="result">
        <h1>Your Score is {mark}</h1>
      </div>
      : null
        }
    
     </div>
    </div>
  );
}

export default App;
