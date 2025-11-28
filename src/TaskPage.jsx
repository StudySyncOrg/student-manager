import React, { useState } from "react";
import { PlusSquare, Search, Filter, Plus } from 'lucide-react';
import AddTaskModal from "./AddTaskModal";
import TaskItem from "./Task-item";
import './TaskPage.css';

function Taskpage(){
    const[tasks, setTasks]=useState([]);
    const[isModalOpen, setIsModalOpen]=useState(false);
    const[taskEdit,setTaskEdit]= useState(null);

    const handleDeleteTask = (taskId) => {
        if (typeof taskId === "undefined") return;
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };

    const handleOpenAddModal=()=>{
        setTaskEdit(null);
        setIsModalOpen(true);
    }

    const handleOpenEditModal=(task)=>{
        setTaskEdit(task);
        setIsModalOpen(true);
    }

    const handleToggleTask=(taskId)=>{
        setTasks(tasks.map(task=>task.id===taskId?{...task,completed:!task.completed}:task));
    };

    const taskStats={
        pending:tasks.filter(t=>!t.completed).length,
        completed:tasks.filter(t=>t.completed).length,
        total:tasks.length
    };

    const handleAddtask = (newTask)=>{
        setTasks([...tasks,{...newTask, id:Date.now(),completed:false}]);
        setIsModalOpen(false);
    };
    
    const handleUpdateTask=(updatedTask)=>{
        const updatedTasks = tasks.map(task=>task.id===updatedTask.id?updatedTask:task);
        setTasks(updatedTasks);
        setIsModalOpen(false);
    };

    return(
        <div className="task-page-container">
            <div className="page-header">
                <div className="page-title">
                    <h1>My Tasks</h1>
                    <p>Stay Organised and Productive.</p>
                </div>
                <button className="addtask-btn" onClick={handleOpenAddModal}>
                    <PlusSquare size={20} />
                    Add Task
                </button>
            </div>

            {/* Stats Section */}
            <div className="stat-grid">
                <div className="statcard">
                    <div className="stat-info">
                        <p className="stat-title">Pending</p>
                        <p className="stat-count">{taskStats.pending}</p>
                    </div>
                    <div className="stat-colorbar" style={{backgroundColor:'#ff9f43'}}></div>
                </div>  
                
                <div className="statcard">
                    <div className="stat-info">
                        <p className="stat-title">Completed</p>
                        <p className="stat-count">{taskStats.completed}</p>
                    </div>
                    <div className="stat-colorbar" style={{backgroundColor:'#2ecc71'}}></div>
                </div>
                
                <div className="statcard">
                    <div className="stat-info">
                        <p className="stat-title">Total</p>
                        <p className="stat-count">{taskStats.total}</p>
                    </div>
                    <div className="stat-colorbar" style={{backgroundColor:'#3498db'}}></div>
                </div>
            </div>

            <div className="task-container">
                <div className="search-n-filters">
                    <div className="searchbar">
                        <Search className="searchicon" size={20} />
                        <input type="text" placeholder="Search tasks..." className="searchinput" />
                    </div>
                    <div className="filter-row">
                        <div className="filter-grp">
                            <Filter className="filter-icon" size={18} />
                            <span className="label">Status:</span>
                            <button className="btn active">All</button>
                            <button className="btn">Pending</button>
                            <button className="btn">Completed</button>
                        </div>
                        <div className="filter-grp">
                            <span className="label">Category:</span>
                            <button className="btn active">All</button>
                            <button className="btn">Academic</button>
                            <button className="btn">Personal</button>
                            <button className="btn">Work</button>
                            <button className="btn">Health</button>
                            <button className="btn">Others</button>
                        </div>
                    </div>
                </div>
            </div>

            {tasks.length===0?(
                <div className="empty-task">
                    <div className="empty-task-icon">
                        <PlusSquare size={32} />
                    </div>
                    <p className="empty-task-text">No task found</p>
                    <p className="empty-task-text2">Get started by adding your first task</p>
                    <button className="add-first-task-btn" onClick={handleOpenAddModal}>
                        <Plus size={18} />
                        Add Your First Task
                    </button>
                </div>
            ):(
                <div className="task-list">
                    {tasks.map(task=>(
                        <TaskItem key={task.id} task={task} onToggle={handleToggleTask} onEdit={handleOpenEditModal} onDelete={handleDeleteTask} />
                    ))}
                </div>
            )}
           
            {isModalOpen &&(
                <AddTaskModal 
                    onClose={()=>setIsModalOpen(false)}
                    onAddTask={handleAddtask} 
                    onUpdateTask={handleUpdateTask} 
                    editingTask={taskEdit} 
                />
            )}
        </div>
    );
}

export default Taskpage;