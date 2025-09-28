import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active',
    },
    completed: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true, // createdAt và updatedAt
})

const Task = mongoose.model("Task", taskSchema);
export default Task;