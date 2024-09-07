import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'done', label: 'Done' },
    { value: 'undone', label: 'Undone' },
];

export function TaskFilter({ updateFilterValue }: { updateFilterValue: (value: string) => void }) {
    return (
        <Select onValueChange={(value) => updateFilterValue(value)} defaultValue={'all'}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
            {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
    );
}