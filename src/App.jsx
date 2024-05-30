
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
 
  const [length , setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const[characterAllowed, setCharacterAllowed] = useState(false)
  const [password , setPassword] = useState("")


  // useRef for copying the data
  const passwordRef = useRef(null)


  // password generator using call back function
  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str = str + "0123446789";

    }
    if(characterAllowed){
      str = str + "!@#$%^&*-+=[]{}~`"
    }
    
    for(let i=1 ; i <= length ; i++){
     let char = Math.floor(Math.random() * str.length + 1)

     pass = pass + str.charAt(char)
    }

    setPassword(pass)
  } , [length , numberAllowed, characterAllowed, setPassword])


  const copyPasswordToClipboard = useCallback( () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect( () => {
    passwordGenerator()
  } ,
    [length , numberAllowed , characterAllowed, passwordGenerator])

 

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-lg 
   rounded-lg px-4 my-8 text-orange-500 bg-gray-500   '>

    <div className='text-white  text-center rounded-lg    '>
      Password Generator
    </div>
    
    <div className='flex shadow rounded-lg overflow-hidden py-1
    gap-1'>

    <input 
   type='text'
   value={password}
   className='outline-none w-full py-1 px-3 rounded mb-4 '
   placeholder='Password'
   readOnly
   ref={passwordRef}
   />
    <button 
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white 
    px-3  shrink-0 h-8 gap-2 rounded-lg '>copy</button>
  </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>

          <input
          
          type='range'
          min={1}
          max={25}
          value={length}
          className='coursor-pointer'
          onChange={(e) => {setLenght(e.target.value)}}
          />

          <label htmlFor='passwordInput'>Length:{length}</label>
        </div>
    {/* check box   for the number*/}
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

          {/* check box for the character */}

          <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          defaultChecked={characterAllowed}
          onChange={() => { setCharacterAllowed((prev) => !prev)

          }}
          />
          <label htmlFor='characterInput'>Characters</label>
          </div>

        
      </div>


   </div>
    </>
  )
}

export default App
