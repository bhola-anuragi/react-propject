import { useState,useCallback,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [length, setLength] = useState(8)

  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const[password,setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%&*[]{}?"
    }
    for(let i = 1;i<=length;i++){
      let randomNum = Math.floor(Math.random() * str.length) + 1; 
      pass += str.charAt(randomNum)
    }

    setPassword(pass)
    // console.log(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  const copytoclip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard")
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  

  
  return (
    <>
    <div className='h-screen w-full bg-black flex justify-center'>
    <div className='bg-gray-800 flex flex-col justify-center items-center w-max h-max mt-20 p-5 rounded-lg gap-5'>
      <p className='text-white'>Password generator</p>
      <div>
        <input 
        type="text" 
        value={password}
        placeholder='Password' 
        readOnly
        className='bg-white w-94 rounded-l-lg p-2 outline-none'
        />
        <button
        className='bg-blue-500 text-white rounded-r-lg p-2 cursor-pointer'
        onClick={copytoclip}
        >copy</button>
      </div>
      <div className='w-full text-white gap-2 flex'>
        <input 
        type="range" 
        min={8} 
        max={50}
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className='bg-blue-500' />
        <label>length: {length}</label>
        <input 
        type="checkbox" 
        id='numberInput'
        defaultChecked={numberAllowed}
        onChange={() => setNumberAllowed(prev => !prev)}
        />
        <label className='text-white' htmlFor='numberInput'>Numbers</label>
        <input 
        type="checkbox" 
        id='charInput'
        defaultChecked={charAllowed}
        onChange={() => setCharAllowed(prev => !prev)}
        />
        <label className='text-white' htmlFor='charInput'>Characters</label>
      </div>
    </div>
    </div>

    </>
  )
}

export default App
