import React, {useEffect, useState} from 'react';
import Header from "@/components/Header.jsx";
import AddTask from "@/components/AddTask.jsx";
import TaskList from "@/components/TaskList.jsx";
import TaskListPagination from "@/components/TaskListPagination.jsx";
import DateTimeFilter from "@/components/DateTimeFilter.jsx";
import StaffAndFilter from "@/components/StaffAndFilter.jsx";
import Footer from "@/components/Footer.jsx";
import {toast} from "sonner";
import api from "@/lib/axios.js";
import {visibleTaskLimit} from "@/lib/data.js";

function HomePage() {
    const [taskBuffer, setTaskBuffer] = useState([])
    const [activeTaskCount, setActiveTaskCount] = useState(0)
    const [completeTaskCount, setCompleteTaskCount] = useState(0)
    const [filter, setFilter] = useState('all')
    const [dateQuery, setDateQuery] = useState('today')
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);
    useEffect(() => {
        console.log('test filter', filter);
        setPage(1);
    }, [filter, dateQuery]);

    const fetchTasks = async () => {
        try {

            const res = await api.get(`task?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks)
            setActiveTaskCount(res.data.activeCount)
            setCompleteTaskCount(res.data.completeCount)

        } catch (err) {
            console.error('Lỗi xảy ra khi truy xuất tasks:', err);
            toast.error('Lỗi xảy ra khi truy xuất tasks');
        }
    };
    const filterTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active' :
                return task.status === 'active';
            case 'completed' :
                return task.status === 'complete';
            default:
                return true;
        }
    })
    const handlePrev = () => {
        if(page > 1) {
            setPage(pre => pre - 1);
        }else {
            setPage(1);
        }
    }

    const visibleTasks = filterTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    )
    useEffect(() => {
        if (visibleTasks.length === 0 && page > 1) {
            handlePrev();
        }
    }, [visibleTasks, page]);

    const totalPages = Math.ceil(filterTasks.length / visibleTaskLimit);

    const handleTaskChanged = async (newTask) => {
        await fetchTasks();
    }

    const handleNext = () => {
        if(page < totalPages) {
            setPage(pre => pre + 1);
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }



    return (
        <div className='min-h-screen w-full bg-[#fefcff] relative'>
            {/*    Dreamy Sky Pink Glow */}
            <div className='absolute inset-0 z-0'
                 style={{
                     backgroundImage: `
                        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)
                        `
                 }}/>
            {/*    Your content/component */}
            <div className='container pt-8 mx-auto relative z-10'>
                <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

                    {/* Đầu trang */}
                    <Header/>

                    {/* Tạo nhiệm vụ */}
                    <AddTask handleNewTaskAdded={handleTaskChanged}/>

                    {/* Thống kê và bộ lọc */}
                    <StaffAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        activeTaskCount={activeTaskCount}
                        completeTaskCount={completeTaskCount}
                    />

                    {/* Danh sách nhiệm vụ */}
                    <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged}/>

                    {/* Phân trang và lọc theo Date */}
                    <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                    </div>

                    {/* Chân trang */}
                    <Footer
                        activeTaskCount={activeTaskCount}
                        completeTaskCount={completeTaskCount}
                    />
                </div>
            </div>
        </div>
    )
        ;
}

export default HomePage;
// https://www.youtube.com/watch?v=L3a9c8M55Fo&t=3022s
// 1:57.04