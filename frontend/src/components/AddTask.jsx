import React, {useState} from 'react';
import {Card} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Plus} from "lucide-react";
import axios from "axios";
import {toast} from "sonner";
import api from "@/lib/axios.js";

function AddTask({handleNewTaskAdded}) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post('task', {title: newTaskTitle.trim()})
                toast.success(`Nhiệm vụ ${newTaskTitle.trim()} đã được thêm thành vào.`)
                handleNewTaskAdded();
            } catch (error) {
                console.error('Lỗi xảy ra khi thêm nhiệm vụ: ', error.message);
                toast.error('Lỗi xảy ra khi thêm nhiệm vụ mới.')
            } finally {
                setNewTaskTitle('')
            }
        } else {
            toast.error('Bạn cần nhập nội dung nhiệm vụ.')
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            if (!newTaskTitle.trim()) {
                toast.error('Bạn cần nhập nội dung nhiệm vụ.')
                return;
            }
            await addTask();
        }
    };
    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className='flex flex-col gap-3 sm:flex-row'>
                <Input
                    type='text'
                    placeholder='Cần phải làm gì?'
                    className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20'
                    value={newTaskTitle}
                    onChange={(event) => setNewTaskTitle(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    variant='gradient'
                    size='xl'
                    className='px-6'
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus size={5}/>
                    Thêm
                </Button>
            </div>
        </Card>
    );
}

export default AddTask;