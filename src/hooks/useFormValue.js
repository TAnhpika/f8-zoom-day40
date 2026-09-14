import { useCallback, useState } from "react";

export default function useFormValues(init = {}) {
    const [formValues, setFormValues] = useState(init);

    const setFieldValue = useCallback((name, value) => {
        setFormValues((preValues) => ({
            ...preValues,
            [name]: value,
        }));
    }, []);

    const handleChange = useCallback(
        (e) => {
            setFieldValue(e.target.name, e.target.value);
        },
        [setFieldValue],
    );

    return { formValues, setFieldValue, handleChange };
}
