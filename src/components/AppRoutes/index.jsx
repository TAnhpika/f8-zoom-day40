import { HashRouter, Route, Routes } from "react-router";

import TaskList from "@/pages/TaskList";
import NewTask from "@/pages/NewTask";
import EditTask from "@/pages/EditTask";

export default function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/new-task" element={<NewTask />} />
                <Route path="/:id/edit" element={<EditTask />} />
            </Routes>
        </HashRouter>
    );
}
