import { ADD_TASK, DELETE_TASK, SET_TASKS, UPDATE_TASK } from "./constants";

export const setTasks = (payload) => {
    return {
        type: SET_TASKS,
        payload,
    }
}

export const addTask = (payload) => {
    return {
        type: ADD_TASK,
        payload,
    }
}

export const updateTask = (payload) => {
    return {
        type: UPDATE_TASK,
        payload,
    }
}

export const deleteTask = (payload) => {
    return {
        type: DELETE_TASK,
        payload,
    }
}