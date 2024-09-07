import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {

    @ApiProperty()
    description: string;

    userId: string;
}