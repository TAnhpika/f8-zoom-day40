// import styles from "./TaskItem.module.scss";

import Context from "@/contexts/Context";
import { useContext } from "react";

export default function TaskItem({ label, name, onChange, ...passProps }) {
    const { formValues, handleChange } = useContext(Context);

    return (
        <div>
            <label>
                <span>{label}</span>
                <input
                    {...passProps}
                    name={name}
                    placeholder="Enter task ..."
                    value={formValues[name]}
                    onChange={(e) => {
                        if (onChange) onChange(e);
                        handleChange(e);
                    }}
                />
            </label>
        </div>
    );
}
