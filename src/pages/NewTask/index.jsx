// import styles from "./NewTask.module.scss";

import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useDispatch } from "@/libs/react-redux";
import http from "@/utils/http";
import { useState } from "react";
import { useNavigate } from "react-router";

const initValues = { title: "T" };

export default function NewTask() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (formValue) => {
        const title = formValue.title.trim();

        if (!title) {
            alert("Please enter task title");
            return;
        }

        setIsSubmitting(true);

        try {
            const task = await http.post("/tasks", { ...formValue, title });

            dispatch({
                type: "task/add-task",
                payload: task,
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
            <h1>NewTask</h1>
            <TaskForm initValues={initValues} onSubmit={handleSubmit}>
                <TaskItem
                    label={"Title: "}
                    name={"title"}
                    required
                    autoFocus
                    disabled={isSubmitting}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add task"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </TaskForm>
        </div>
    );
}
