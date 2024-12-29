import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();
const allowedOrigins = ["https://tic-tac-toe-muliplayer.vercel.app","https://tic-tac-toe-muliplayer-rubens-projects-8b67fb1e.vercel.app"];

const app = express();

const PORT = 3001;

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const serverClient = StreamChat.getInstance(api_key,api_secret);

app.get("/api",async(req,res)=>{
    res.json({message:"Hello"});
})

app.post("/api/signup",async( req,res) =>{
    try {
        const {firstName, lastName, username, password} = req.body;
        const userId = uuidv4();
        const hashedPassword = await(bcrypt.hash(password,10));
        const token = serverClient.createToken(userId);
        return res.json({token, userId, firstName,lastName, username, hashedPassword});
    } catch (error) {
        return res.json(error); 
    }
});

app.post("/api/login",async(req,res) =>{
    try{
        const { username, password } = req.body;
        let users;
        try {
            users = await serverClient.queryUsers({ name: username });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.json({ message: "Error fetching users" });
        }
        if(users.length == 0){
            console.log("User not found");
            return res.json({message:"User not found"});
        }
        const token = serverClient.createToken(users.users[0].id);
        const passwordCheck = await bcrypt.compare(password, users.users[0].hashedPassword);
        if(passwordCheck){
            return res.json({
                token,
                firstName: users.users[0].firstName,
                lastName: users.users[0].lastName,
                username,
                userId: users.users[0].id,
            });
        }
    }catch(error){
        return res.json(error);
    }
    
});

app.listen(PORT, () => {});

export default app;