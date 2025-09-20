'use client'
import React, { useState } from "react";

const page = () => {
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [mainTask, setmainTask] = useState([])

    const submitHandler = (e) => {
        e.preventDefault();
        setmainTask([...mainTask, { title, desc }]);
        settitle('');
        setdesc('');
    }

    const deleteHandler = (i) => {
        const copyTask = [...mainTask];
        copyTask.splice(i, 1);
        setmainTask(copyTask);
    }

    let renderTask = <h2 className="text-center">No Tasks Added</h2>

    if (mainTask.length > 0) {
        renderTask = mainTask.map((task, i) => {
            return (
                <li key={i} className="border-2 border-zinc-800 p-5 m-4 rounded-lg bg-white flex items-center justify-between">
                    <h2 className="text-2xl">{task.title}</h2>
                    <p className="text-lg">{task.desc}</p>
                    <button className="bg-red-600 text-white px-4 py-3 rounded-lg"
                        onClick={deleteHandler}
                    >
                        Delete Task
                    </button>
                </li>
            )
        })
    }

    return (
        <>
            <div className="text-3xl bg-black text-white px-3 py-5 text-center">
                Todo App
            </div>

            <form className="flex justify-center mt-10" onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Add your task"
                    className="border-4 border-zinc-800 px-3 py-2 rounded-lg w-1/3 mx-2"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder=" Add task Description"
                    className="border-4 border-zinc-800 px-3 py-2 rounded-lg w-1/3 mx-2"
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                />

                <button className="bg-zinc-800 text-white px-3 py-2 mx-4 rounded-lg">
                    Add Task
                </button>
            </form>

            <hr className="mt-5" />

            <div className="p-8 mt-5 bg-slate-200">
                <ul>
                    {renderTask}
                </ul>
            </div>
        </>
    );
};

export default page;
