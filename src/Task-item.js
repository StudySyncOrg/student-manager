import React from "react";
import { Edit, Trash2, Calendar } from 'lucide-react';
import './Task-item.css';

function TaskItem({task, onToggle, onEdit, onDelete}){
    return(
        <div className="task-card">
            <div className="task-info">
                <input type="checkbox" className="task-checkbox" checked={task.completed} onChange={()=>onToggle(task.id)}/>
                <div>
                    <p className={task.completed?'task-title completed':'task-title'}>{task.title}</p>
                    <p className={task.completed? 'task-description completed':'task-description'}>{task.description}</p>
                </div>
            </div>
            <div className="task-detail">
                <span className="task-priority">{task.priority}</span>
                <span className="task-category">{task.category}</span>
                <span className="task-duedate">
                    <Calendar size={16} />
                    {task.dueDate}
                </span>
            </div>
            <div className="task-action">
                <button className="icon-btn" onClick={()=>onEdit(task)}>
                    <Edit size={18} />
                </button>
                <button className="icon-btn" onClick={()=> typeof onDelete==="function" && onDelete(task.id)}>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}

export default TaskItem;