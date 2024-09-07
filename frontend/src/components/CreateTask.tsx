import { useState } from "react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { createTask } from "@/providers/TaskService";

export function CreateTask({ newTaskCreated }: { newTaskCreated: (newTask: any) => void }) {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) {
            return;
        }
        const data = await createTask(description.trim());
        newTaskCreated(data);
        setDescription('');
    };
    return (
        <>
            <TableRow>
                <TableCell colSpan={2}>
                    <form onSubmit={handleSubmit} id="create-new-task">
                        <Input placeholder="Create task" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </form>
                </TableCell>
                <TableCell className="flex justify-center">
                    <Button type="submit" form="create-new-task">Create</Button>
                </TableCell>
            </TableRow>
        </>
    );
}