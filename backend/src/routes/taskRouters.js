import express from 'express';
import {createTask, deleteTask, getAllTask, updateTask} from "../../controller/taskController.js";

const router = express.Router();

router.get('/', getAllTask)

router.post('/', createTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

export default router;

