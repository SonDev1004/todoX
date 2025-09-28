import express from 'express';
import taskRouters from "./routes/taskRouters.js";
import {connectDB} from "../config/db.js";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // directoryName

const app = express();

// Middleware
app.use(express.json());

// Cấu hình CORS chỉ chạy khi môi trường development
if(process.env.NODE_ENV !== 'production') {
    app.use(cors({origin: ['http://localhost:5173', 'http://localhost:5174']}));
}

app.use('/api/task', taskRouters)

console.log("🚀 ~  ~ process.env.NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Với bất kỳ URL nào mà người dùng gõ vào trình duyêt. Nó sẽ trả về file index.html
    // để React Router xử lý định tuyến phía client
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


connectDB().then(() => {

    app.listen(PORT, () => {
        console.log('Server đang chạy trên cổng 5001');
    })

});
