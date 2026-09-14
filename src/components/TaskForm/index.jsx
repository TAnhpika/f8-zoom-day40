// import styles from "./TaskForm.module.scss";

import Context from "@/contexts/Context";
import useFormValues from "@/hooks/useFormValue";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router";

const TaskForm = forwardRef(
    ({ children, initValues, onSubmit, submitText }, ref) => {
        const { formValues, setFieldValue, handleChange } =
            useFormValues(initValues);
        const navigate = useNavigate();
        const [isSubmitting, setIsSubmitting] = useState(false);

        useImperativeHandle(
            ref,
            () => ({
                setFieldValue,
            }),
            [setFieldValue],
        );

        const handleSubmit = async (e) => {
            e.preventDefault();

            const title = formValues.title.trim();

            if (!title) {
                alert("Please enter task title");
                return;
            }

            setIsSubmitting(true);

            try {
                await onSubmit({
                    ...formValues,
                    title,
                });
                navigate(-1);
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsSubmitting(false);
            }
        };

        const values = {
            formValues,
            handleChange,
            isSubmitting,
        };

        return (
            <Context value={values}>
                <form onSubmit={handleSubmit}>
                    {children}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submit..." : submitText}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </form>
            </Context>
        );
    },
);

export default TaskForm;
