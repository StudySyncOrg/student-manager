import React, { useState, useEffect } from "react";
import { X } from 'lucide-react';
import './AddTaskModal.css';

function AddTaskModal({ onClose, onAddTask, onUpdateTask, editingTask }) {
    const isEditing = !!editingTask;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Academic');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (isEditing) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setCategory(editingTask.category);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate);
        }
    }, [isEditing, editingTask]);

    const handleSubmit = () => {
        if (!title) {
            alert('Title is required');
            return;
        }
        const taskData = { title, description, priority, category, dueDate };
        if (isEditing) {
            onUpdateTask({ ...taskData, id: editingTask.id, completed: editingTask.completed });
        } else {
            onAddTask(taskData);
        }
    };

    return (
        <div className="overlay">
            <div className="content">
                <div className="header">
                    <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>
                <div className="body">
                    <label>Title *</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter Task Title" 
                    />
                    
                    <label>Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Enter the task description" 
                    />
                    
                    <div className="row">
                        <div className="group">
                            <label>Priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="group">
                            <label>Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Academic</option>
                                <option>Personal</option>
                                <option>Work</option>
                                <option>Health</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <label>Due Date</label>
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                    />
                </div>
                <div className="footer">
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                    <button onClick={handleSubmit} className="add-btn">
                        {isEditing ? 'Save Changes' : 'Add Task'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal;