import { ApiProperty } from "@nestjs/swagger";

export class signInDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;
}