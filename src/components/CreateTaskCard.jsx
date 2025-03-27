import React, { useState } from "react";
import { Task } from "../classes/Task";

export const CreateTaskCard = ({ onSave, onCancel }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("Medium");

    const handleSave = () => {
        if (!taskTitle || !taskDate || !taskDescription) {
            alert("Please fill in all fields!");
            return;
        }

        onSave(new Task(
            taskTitle,
            taskDescription,
            taskDate,
            taskPriority,
            false // Default to not completed
        )
        );

        // Clear inputs after saving
        setTaskTitle("");
        setTaskDate("");
        setTaskDescription("");
        setTaskPriority("Medium");
    };

    return (
        <>
            <div className=" bg-blue-400/40 rounded-3xl border-2 border-blue-400 p-4 text-blue-700">
                <h2 className="text-2xl  font-bold mb-2">Create New Task</h2>

                <div className="grid grid-cols-2 gap-4 [&_*:not(label):not(div)]:bg-white [&_*:not(label):not(div)]:text-black ">
                    <div className="col-1">
                        {/* Task Title */}
                        <label>Task Title</label>
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full p-2 border rounded "
                        />
                    </div>
                    <div className="col-2">
                        {/* Due Date */}
                        <label>Date</label>

                        <input
                            type="date"
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className="w-full p-2 border rounded "
                        />

                    </div>
                    <div className="col-1">
                        {/* Description */}
                        <label>Description</label>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="w-full p-2 border rounded  h-20"
                        />
                    </div>
                    <div className="col-2">
                        {/* Priority Dropdown */}
                        <label>Priority</label>
                        <select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            className="w-full p-2 border rounded "
                        >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                        </select>
                    </div>

                </div>
            </div>
            <div className="flex gap-2 mt-2 justify-center">
                {/* Buttons */}
                <button
                    className="bg-green-500 text-white px-4 py-1 rounded w-full"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-1 rounded w-full"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};
