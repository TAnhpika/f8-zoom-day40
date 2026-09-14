// import styles from "./EditTask.module.scss";

import http from "@/utils/http";
import { useEffect } from "react";
import { useParams } from "react-router";

import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useDispatch } from "@/libs/react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        const title = formValue.title.trim();

        if (!title) {
            alert("Please enter task title");
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedTask = await http.put(`/tasks/${id}`, {
                ...formValue,
                title,
            });

            dispatch({
                type: "task/update-task",
                payload: updatedTask,
            });
            navigate(-1);
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 >EditTask with id: {id}</h2>

            <TaskForm
                initValues={{ title: task.title }}
                onSubmit={handleSubmit}
            >
                <TaskItem
                    label={"Title: "}
                    name={"title"}
                    required
                    autoFocus
                    disabled={isSubmitting}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update task"}
                </button>
                <button type="button" onClick={() => navigate(-1)} disabled={isSubmitting}>
                    Cancel
                </button>
            </TaskForm>
        </div>
    );
}
