import React, {useState} from 'react'
import {useChatContext, Channel} from 'stream-chat-react'
import Game from "./Game";
import CustomInput from "./CustomInput";
import About from "./About"

function JoinGame() {
  const[rivalUsername, setRiverUsername] = useState("");
  const {client}  = useChatContext();
  const[channel,setChannel] = useState(null);

  const createChannel = async () =>{
    if( rivalUsername === client.user.name){
      alert("You cannot play against yourself");
      return;
    }
    const response = await client.queryUsers({name :{ $eq: rivalUsername}});
    if (response.users.length === 0){
        alert("User not found")
        return
    }
    const newChannel = await client.channel("messaging",{
      members:[client.userID, response.users[0].id],
    });
    await newChannel.watch()
    setChannel(newChannel);
  };

  return (
    <>
      { channel ? 
        (<Channel channel = {channel} Input = {CustomInput}>
          <Game channel = {channel} setChannel={setChannel}/>
        </Channel> 
        ):(
        <div className ="joinGame">
          <About/>
          <h2 className ="joinGameHeading"> Join Game </h2>
          <div className = "joinGameContainer">
            <input className = "inputRivalUser" placeholder ="Username of rival..." 
              onChange = {(event) =>
                {setRiverUsername(event.target.value);
                }}/>
            <button className = "joinGamebtn" onClick = {createChannel}> Join Game </button>
          </div>
        </div>
      )}
    </>
  );
}

export default JoinGame