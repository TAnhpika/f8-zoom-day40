import {
    ADD_TASK,
    DELETE_TASK,
    SET_LOADING,
    SET_TASKS,
    UPDATE_TASK,
} from "./constants";

const initState = {
    tasks: [],
    loading: false,
    error: "",
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.payload, loading: false };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...(state.tasks || []), action.payload],
                loading: false,
            };
        case UPDATE_TASK:
            return { ...state, tasks: action.payload, loading: false };
        case DELETE_TASK:
            return { ...state, tasks: action.payload, loading: false };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default reducer;
