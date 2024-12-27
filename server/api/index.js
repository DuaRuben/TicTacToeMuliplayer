import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();
const allowedOrigins = ["https://tic-tac-toe-muliplayer-backend.vercel.app"];

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
        res.json({token, userId, firstName,lastName, username, hashedPassword});
    } catch (error) {
        res.json(error); 
    }
});

app.post("/api/login",async(req,res) =>{
    try{
        console.log(1)
        const { username, password } = req.body;
        console.log(1.5)
        console.log(username);
        console.log(password);
        let users;
        try {
            users = await serverClient.queryUsers({ name: username });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.json({ message: "Error fetching users" });
        }
        console.log("Users:", users);
        console.log(2);
        if(users.length == 0){
            console.log("User not found");
            return res.json({message:"User not found"});
        }
        console.log(3)
        const token = serverClient.createToken(users[0].id);
        console.log(token);
        const passwordCheck = await bcrypt.compare(password, users[0].hashedPassword);
        console.log(passwordCheck);
        console.log(4)
        if(passwordCheck){
            res.json({
                token,
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                username,
                userId: users[0].id,
            });
        }
        console.log(5)
    }catch(error){
        res.json(error);
    }
    
});

app.listen(PORT, () => {});

export default app;