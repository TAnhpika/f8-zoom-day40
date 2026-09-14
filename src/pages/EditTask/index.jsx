// import styles from "./EditTask.module.scss";

import http from "@/utils/http";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function EditTask() {
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const response = await http.get(`/tasks/${id}`);
            console.log(response);
        })();
    }, [id]);
    
    return (
        <div>
            <h1>EditTask: {id}</h1>
            
        </div>
    );
}
