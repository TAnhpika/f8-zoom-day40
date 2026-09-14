// import styles from "./TaskList.module.scss";

import { useDispatch, useSelector } from "@/libs/react-redux";
import http from "@/utils/http";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function TaskList() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const loading = useSelector((state) => state.task.loading);
    const navigate = useNavigate();

    console.log("TaskList re-render");

    useEffect(() => {
        (async () => {
            dispatch({
                type: "task/set-loading",
                payload: false,
            });
            try {
                const response = await http.get("/tasks");

                dispatch({
                    type: "task/set-tasks",
                    payload: response,
                });
            } catch (error) {
                console.error(error.message);
            } finally {
                dispatch({
                    type: "task/set-loading",
                    payload: false,
                });
            }
        })();
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (!confirm("Delete this task?")) return;
        
        try {
            await http.del(`/tasks/${id}`);

            dispatch({
                type: "task/delete-task",
                payload: id,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <button onClick={() => navigate("/new-task")}>
                Create new task
            </button>
            <h1>Task list:</h1>
            {loading ? (
                <div>Loading...</div>
            ) : tasks?.length ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <span>{task.title}</span>
                            <button
                                onClick={() => {
                                    navigate(`/${task.id}/edit`);
                                }}
                            >
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Chưa có task nào</div>
            )}
        </div>
    );
}
