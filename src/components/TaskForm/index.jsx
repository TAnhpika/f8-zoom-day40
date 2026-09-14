// import styles from "./TaskForm.module.scss";

import Context from "@/contexts/Context";
import useFormValues from "@/hooks/useFormValue";
import { forwardRef, useImperativeHandle } from "react";

const TaskForm = forwardRef(({ children, initValues, onSubmit }, ref) => {
    const { formValues, setFieldValue, handleChange } =
        useFormValues(initValues);

    useImperativeHandle(
        ref,
        () => ({
            setFieldValue,
        }),
        [setFieldValue],
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    const values = {
        formValues,
        handleChange,
    };

    return (
        <Context value={values}>
            <form onSubmit={handleSubmit}>{children}</form>
        </Context>
    );
});

export default TaskForm;
