import TaskModel from "../models/Task.js";

export const getAllTask = async (req, res) => {
    const {filter = 'today'} = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 28/09/2025 00:00:00
            break;
        case 'week':
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case "all":
        default:
            startDate = null;
    }
    const query = startDate ? {createdAt: {$gte: startDate }} : {}; // gte: greater than equal

    try {
        const result = await TaskModel.aggregate([
            {$match: query},
            {
                $facet: {
                    tasks: [{$sort: {createdAt: -1}}],
                    activeCount: [{$match: {status: 'active'}}, {$count: 'count'}],
                    completeCount: [{$match: {status: 'complete'}}, {$count: 'count'}]
                },
            },
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;
        res.status(200).json({tasks, activeCount, completeCount});
    } catch (e) {
        console.error("Lỗi khi gọi getAllTask", e);
        res.status(500).json("Lỗi hệ thống");
    }
}

export const createTask = async (req, res) => {
    try {
        const title = req.body.title;

        const task = new TaskModel({title})
        const newTask = await task.save();
        res.status(201).json({newTask})
    } catch (e) {
        console.error("Lỗi khi gọi createTask", e.message);
        res.status(500).json({message: 'Lỗi hệ thống'});
    }
}

export const updateTask = async (req, res) => {
    try {
        const {title, status, completed} = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, {
            title,
            status,
            completed,
        }, {
            new: true, // trả về giá trị sau khi update
        })
        if (!updatedTask) {
            res.status(404).json({message: 'Nhiệm vụ không tồn tại'})
        }

        res.status(200).json(updatedTask);
    } catch (e) {
        console.error("Lỗi khi gọi updateTask", e.message);
        res.status(500).json({message: 'Lỗi hệ thống'})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({message: "Nhiệm vụ không tồn tại"});
        }
        res.status(200).json(deleteTask);
    } catch (e) {
        console.error("Lỗi khi gọi deleteTask", e.message);
        res.status(500).json({message: 'Lỗi hệ thống'})
    }
}