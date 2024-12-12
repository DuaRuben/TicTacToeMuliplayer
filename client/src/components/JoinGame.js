import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react'

function JoinGame() {
  const[rivalUsername, setRiverUsername] = useState("");
  const {client}  = useChatContext();
  const createChannel = async () =>{
    const response = await client.queryUsers({name :{ $eq: rivalUsername}});
    if (response.users.length === 0){
        alert("User not found")
        return
    }


    const newChannel = await client.channel()
  }
  return (
    <div className ="joinGame">
      <h4> Join Game </h4>
      <input placeholder ="Username of rival..." 
        onChange = {(event) =>
          {setRiverUsername(event.target.value);

          }}/>
      <button onClick = {createChannel}> Join Game </button>
    </div>
  )
}

export default JoinGame