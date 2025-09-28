import express from 'express';
import taskRouters from "./routes/taskRouters.js";
import {connectDB} from "../config/db.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173', 'http://localhost:5174']}));
app.use('/api/task', taskRouters)

connectDB().then(()=>{

    app.listen(PORT, () => {
        console.log('Server đang chạy trên cổng 5001');
    })

});
