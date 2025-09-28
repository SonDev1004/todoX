import React, {useState} from 'react';
import {Card} from "@/components/ui/card.jsx";
import {cn} from "@/lib/utils.js";
import {Button} from "@/components/ui/button.jsx";
import {Calendar, CheckCircle2, Circle, SquarePen, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import api from "@/lib/axios.js";
import {toast} from "sonner";

function TaskCard({task, index, handleTaskChanged}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');
    const deleteTask = async (taskId) => {
        try {
            await api.delete('/task/' + taskId);
            toast.success('Nhiệm vụ đã được xóa thành công.');
            // Thông báo lên component cha.
            handleTaskChanged();
        } catch (error) {
            console.error(`Lỗi xảy ra khi xóa nhiệm vụ`, error.message);
            toast.error('Lỗi xảy ra khi xóa nhiệm vụ.');
        }
    };

    const updateTask = async () => {
        try {
            await api.put(`task/${task._id}`, {title: updateTaskTitle});
            toast.success(`Nhiệm vụ đã được đổi thành ${updateTaskTitle}`);
            // Thông báo lên component cha.
            handleTaskChanged();
        } catch (e) {
            console.error("Lỗi xảy ra khi xóa nhiệm vụ.", e.message);
            toast.error('Lỗi xảy ra khi cập nhật nhiệm vụ.');
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if (task.status === 'active') {
               const response = await api.put(`task/${task._id}`, {
                    status: 'complete',
                   completed: new Date().toISOString(),
                });
                toast.success(`${task.title} đã được đánh dấu hoàn thành.`);
            } else {
                await api.put(`task/${task._id}`, {
                    status: 'active',
                    completedAt: null,
                });
                toast.success(`${task.title} đã đổi sang trạng thái chưa hoàn thành.`
                );
            }
            handleTaskChanged();
        } catch (error) {
            console.error('Lỗi xảy ra khi cập nhật trạng thái nhiệm vụ.', error.message);
            toast.error('Lỗi xảy ra khi cập nhật trạng thái nhiệm vụ.');
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            if (!updateTaskTitle.trim()) {
                toast.error('Tiêu đề nhiệm vụ không được để trống.');
                return;
            }
            await updateTask();
            setIsEditing(false);
        }
    };
    return (
        <Card className={cn(
            'p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
            task.status === 'complete' && 'opacity-75')}
              style={{animationDelay: `${index * 50}ms`}}
        >
            <div className='flex items-center gap-4'>
                {/* nút tròn */}
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === 'complete'
                            ? 'text-success hover:text-success/80'
                            : 'text-muted-foreground hover:text-primary')}
                    onClick={toggleTaskCompleteButton}
                >
                    {
                        task.status === 'complete'
                            ? <CheckCircle2 className='size-5'/>
                            : <Circle className='size-5'/>
                    }
                </Button>

                {/* Hiển thị hoặc chỉnh sửa title */}
                <div className='flex-1 min-w-0'>
                    {isEditing ? (
                        <Input
                            placeholder="Cần phải làm gì?"
                            className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                            type='text'
                            value={updateTaskTitle}
                            onChange={(event) => setUpdateTaskTitle(event.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() => {
                                setIsEditing(false);
                                setUpdateTaskTitle(task.title || '');
                            }}
                        />
                    ) : (
                        <p className={cn("text-base transition-all duration-200",
                            task.status === 'complete'
                                ? 'line-through text-muted-foreground'
                                : 'text-foreground')}>
                            {task.title}
                        </p>
                    )}
                    {/* ngày tạo và ngày hoàn thành */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className='size-3 text-muted-foreground'/>
                        <span className='text-xs text-muted-foreground'>
                        {new Date(task.createdAt).toLocaleString()}
                    </span>
                        {task.completed && (
                            <>
                                <Calendar className='size-3 text-muted-foreground'/>
                                <span className='text-xs text-muted-foreground'>
                                    {new Date(task.completed).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* nút chỉnh và xóa */}
                <div className='hidden group-hover:inline-flex animate-slide-up'>
                    {/*    nút edit */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
                        onClick={() => {
                            setIsEditing(true);
                            setUpdateTaskTitle(task.title || '');
                        }}
                    >
                        <SquarePen className='size-'/>
                    </Button>
                    {/*    nút xóa */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className='size-4'/>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default TaskCard;