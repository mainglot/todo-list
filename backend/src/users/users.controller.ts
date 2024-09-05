import { Controller, Get, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('create-default-user')
    async createDefaultUser() {
        let user = await this.usersService.findOne('admin');

        if (!user) {
            user = await this.usersService.create({
                name: 'admin',
                password: 'admin'
            });

            if (!user) {
                throw new NotFoundException();
            }
        }

        return {
            message: 'User admin is created',
        };
    }
}