import { ApiProperty } from "@nestjs/swagger";

export class TodoItemIdDto {
    @ApiProperty()
    id: string;
}