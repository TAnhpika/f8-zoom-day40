import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider as TaskProvider } from "./contexts/ReduxContext";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
    <TaskProvider store={store}>
        <App />
    </TaskProvider>,
);
