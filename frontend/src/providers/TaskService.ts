import { Task } from "@/types/Task";
import { tFetch } from "@/utils/tfetch";

const link = 'http://localhost:3000/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
    return tFetch(link, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => response.json());
};

export const createTask = async (description: string): Promise<Task> => {
    return tFetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ description }),
        })
        .then((response) => response.json());
};

export const setDoneTask = async (task: Task): Promise<Task> => {
    return tFetch(`${link}/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ done: !task.done }),
        })
        .then((response) => response.json());
};

export const deleteTask = async (task: Task): Promise<void> => {
    return tFetch(`${link}/${task._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => response.json());
};