import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Kết nối database thành công");
    } catch (error) {
        console.log("Lỗi khi kết nối CSDL: ", error.message);
        process.exit(1);
    }
};