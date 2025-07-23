import { useEffect, useState } from "react";
import ColorHash from "color-hash";

//Create colorhash
const colorHash = new ColorHash();

//Component for message in the chat
function Message({message, onDelete, sender}) {

  return (
    <div className={`text-xl m-1 flex text-gray-900 dark:text-white w-fit transition-colors duration-500 ${sender === message.username ? 'hover:cursor-not-allowed' : ''}`} onClick={onDelete}><div style={{color: colorHash.hex(message.username)}} className='font-bold inline mr-1'>{message.username}:</div> {message.message}</div>
    );
}

//Entire page render
function App() {

  //use states for controlling living parts
  const [messages, setMessages] = useState([{UUID: crypto.randomUUID(), username: 'The chat starts here', message: 'Hello!'}]);
  const [sender, setSender] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [shownSenderText, setShownSenderText] = useState('')
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let savedMode = localStorage.getItem('displayMode')
    if(!savedMode){
      savedMode = 'dark'
      setDarkMode(true)
      localStorage.setItem('displayMode', savedMode)
    }
    setDarkMode(savedMode === 'dark')
  }, [])

  const toggleDisplayMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('displayMode', newMode ? 'dark' : 'light');
  }

  //function that handles if a message should be able to be sent then adds it to the array
  function sendMessage() {
    if (sender && currentMessage) {
      setMessages([...messages, {UUID: crypto.randomUUID(), username: sender, message: currentMessage}])
      setCurrentMessage('')
    }
  }

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
  }

  const handleClearChat = ()=> {
    setMessages([]);
    setCurrentMessage('');
    setSender('');
    setShownSenderText('');
  }

  //The entire page structure
  return (
    <div id='entire-page' className={`${darkMode ? 'dark' : ''} transition-colors duration-500 h-screen flex flex-row w-screen bg-gray-500`}>
      <div id='left-menu' className='h-screen w-96 flex flex-col justify-between items-center bg-white border-r border-gray-200 dark:bg-black dark:border-gray-700 transition-colors duration-500'>
        <div className='h-full flex flex-col justify-around'>
          <button onClick={()=>{toggleDisplayMode()}} className='text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-400'>{darkMode ? 'Set to Light' : 'Set to Dark'}</button>
          <button className='text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-400' onClick={handleClearChat}>Reset</button>
        </div>
        <div id='current-user' className='h-28 w-96 flex flex-col items-center rounded-r-xl bg-gradient-to-tr from-white to-gray-300 dark:from-black dark:to-slate-700 transition-colors duration-500'>
          <p className='text-lg text-gray-800 dark:text-white'>Enter your username:</p>
          <input onBlur={(e)=> setShownSenderText(e.target.value)} value={sender} onChange={(e)=> setSender(e.target.value)}  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors duration-500' placeholder="Username..." required></input>
          { shownSenderText && <p className='text-lg font-bold text-gray-800 dark:text-white'>Welcome {shownSenderText}</p>}
        </div>
      </div>
      <div id='message-board' className='h-screen grow dark:bg-[url(src/Images/john-towner-JgOeRuGD_Y4-unsplash.jpg)] bg-[url(src/Images/Screenshot2025-07-22165032.png)] bg-cover flex-wrap content-end bg-white/90 dark:bg-black/70 transition-colors duration-500'>
        {messages.map((m)=><Message message={m} sender={sender} onDelete={()=>setMessages(messages.filter((e)=> (e.username !== sender) || (e.message !== m.message) || (e.UUID !== m.UUID)))}/>)}
          <form onSubmit={handleSubmit}>
            <input type='text' onChange={(e)=> setCurrentMessage(e.target.value)} value={currentMessage} className='h-12 w-full p-4 border border-gray-300 rounded-lg bg-white text-base text-gray-800 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-1 transition-colors duration-500' placeholder='Type your message here...'></input>
            <button type="submit" onClick={sendMessage} className="absolute right-2 bottom-2.5 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-4 py-2 mt-2 dark:text-gray-800 dark:bg-gray-200  dark:hover:bg-gray-300 dark:focus:ring-blue-300">Send Message</button>
          </form>
      </div>
    </div>
  );
}

export default App;
