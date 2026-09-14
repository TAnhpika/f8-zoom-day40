// import styles from "./NewTask.module.scss";

import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useDispatch } from "@/libs/react-redux";
import http from "@/utils/http";
import { useNavigate } from "react-router";

const initValues = { title: "Giặt đồ" };

export default function NewTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (formValue) => {
        try {
            const task = await http.post("/tasks", formValue);

            dispatch({
                type: "task/add-task",
                payload: task,
            });
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>NewTask</h1>
            <TaskForm initValues={initValues} onSubmit={handleSubmit}>
                <TaskItem label={"Title: "} name={"title"} />
                <button>Add task</button>
            </TaskForm>
        </div>
    );
}
