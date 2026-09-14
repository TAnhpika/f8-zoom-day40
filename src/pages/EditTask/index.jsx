// import styles from "./EditTask.module.scss";

import http from "@/utils/http";
import { useEffect } from "react";
import {  useParams } from "react-router";

import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useDispatch } from "@/libs/react-redux";
import { useState } from "react";

export default function EditTask() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await http.get(`/tasks/${id}`);
                setTask(response);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (formValue) => {
        try {
            const updatedTask = await http.put(`/tasks/${id}`, formValue);

            dispatch({
                type: "task/update-task",
                payload: updatedTask,
            });

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>EditTask with id: {id}</h2>

            <TaskForm
                initValues={{ title: task.title }}
                onSubmit={handleSubmit}
                submitText={"Update task"}
            >
                <TaskItem label={"Title: "} name={"title"} required autoFocus />
            </TaskForm>
        </div>
    );
}
