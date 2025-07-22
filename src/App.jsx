import { useState } from "react";
import ColorHash from "color-hash";

//Create colorhash
const colorHash = new ColorHash();

//Component for message in the chat
function Message({message, onDelete, sender}) {

  return (
    <div className={`text-xl m-1 flex text-white w-fit ${sender === message.username ? 'hover:cursor-not-allowed' : ''}`} onClick={onDelete}><div style={{color: colorHash.hex(message.username)}} className='font-bold inline mr-1 brightness-125'>{message.username}:</div> {message.message}</div>
    );
}

//Entire page render
function App() {

  //use states for controlling living parts
  const [messages, setMessages] = useState([{UUID: crypto.randomUUID(), username: 'The chat starts here', message: 'Hello!'}]);
  const [sender, setSender] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [shownSenderText, setShownSenderText] = useState('')

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

  //The entire page structure
  return (
    <div id='entire-page' className='h-screen flex flex-row w-screen bg-gray-500'>
      <div id='left-menu' className='h-screen w-96 flex items-end bg-gray-500'>
        <div id='current-user' className='h-28 w-96 flex flex-col items-center rounded-r-xl bg-gradient-to-tr from-black to-slate-600'>
          <p className='text-lg text-white'>Enter your username:</p>
          <input onBlur={(e)=> setShownSenderText(e.target.value)} value={sender} onChange={(e)=> setSender(e.target.value)}  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Username..." required></input>
          { shownSenderText && <p className='text-lg font-bold text-white'>Welcome {shownSenderText}</p>}
        </div>
      </div>
      <div id='message-board' className='h-screen grow bg-[url(src/Images/john-towner-JgOeRuGD_Y4-unsplash.jpg)] bg-cover flex-wrap content-end'>
        {messages.map((m)=><Message message={m} sender={sender} onDelete={()=>setMessages(messages.filter((e)=> (e.username !== sender) || (e.message !== m.message) || (e.UUID !== m.UUID)))}/>)}
          <form onSubmit={handleSubmit}>
            <input type='text' onChange={(e)=> setCurrentMessage(e.target.value)} value={currentMessage} className='h-12 w-full p-4 border rounded-lg bg-gray-200 text-base focus:ring-green-500 focus:border-green-500 b-2 border-black mb-1' placeholder='Type your message here...'></input>
            <button type="submit" onClick={sendMessage} className="text-white absolute end-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-4 py-2 mt-[6px]">Send Message</button>
          </form>
      </div>
    </div>
  );
}

export default App;
