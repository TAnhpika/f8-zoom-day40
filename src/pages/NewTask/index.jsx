// import styles from "./NewTask.module.scss";

import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useDispatch } from "@/libs/react-redux";
import http from "@/utils/http";

const initValues = { title: "T" };

export default function NewTask() {
    const dispatch = useDispatch();

    const handleSubmit = async (formValue) => {
        try {
            const task = await http.post("/tasks", formValue);

            dispatch({
                type: "task/add-task",
                payload: task,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>NewTask</h1>
            <TaskForm
                initValues={initValues}
                onSubmit={handleSubmit}
                submitText={"Add task"}
            >
                <TaskItem label={"Title: "} name={"title"} required autoFocus />
            </TaskForm>
        </div>
    );
}
