import { CreateTask } from "@/components/CreateTask";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { TaskFilter } from "@/components/TaskFilter";
import { Task } from "@/types/Task";
import { useEffect, useMemo, useState } from "react";
import { deleteTask, fetchTasks, setDoneTask } from "@/providers/TaskService";
import { Button } from "@/components/ui/button";

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filterValue, setFilterValue] = useState('all');

    const filteredTasks = useMemo(() => {
        if (filterValue === 'all') {
            return tasks;
        } else {
            return tasks.filter((task: Task) => {
                if (filterValue === 'done') {
                    return task.done;
                }
                return !task.done;
            });
        }
    }, [filterValue, tasks]);

    useEffect(() => {
        fetchTasks().then((data) => setTasks(data));
    }, []);

    const handleNewTask = (newTask: Task) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask: Task) => {
        const newTasks = tasks.map((task) => {
            if (task._id === updatedTask._id) {
                return updatedTask;
            }
            return task;
        });
        setTasks(newTasks);
    };

    const handleDoneTask = async (task: Task) => {
        const updatedTask = await setDoneTask(task);
        handleTaskUpdated(updatedTask);
    };

    const handleDeleteTask = async (task: Task) => {
        await deleteTask(task);
        const newTasks = tasks.filter((t) => t._id !== task._id);
        setTasks(newTasks);
    };

    return (
        <>
        <div className="m-2">
            <TaskFilter updateFilterValue={setFilterValue} />
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tasks: {filteredTasks.length}/{tasks.length}</TableHead>
                    <TableHead className="w-[150px] text-center">Status</TableHead>
                    <TableHead className="w-[200px] text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filterValue !== 'done' && <CreateTask newTaskCreated={handleNewTask} />}
                {filteredTasks.map((task: Task) => (
                    <TableRow key={task._id}>
                        <TableCell>{task.description}</TableCell>
                        <TableCell className="text-center">{task.done ? 'Done' : 'In progress'}</TableCell>
                        <TableCell className="flex flex-row gap-2 justify-end">
                            {!task.done
                                && <Button 
                                        variant="secondary"
                                        onClick={() => handleDoneTask(task)}
                                        >Done</Button>}
                            <Button
                                variant="outline"
                                onClick={() => handleDeleteTask(task)}
                                >Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    );
}