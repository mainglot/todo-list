import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(name: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(name);
        if (user == null || user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = {
            name: user.name,
        };

        const access_token = await this.jwtService.signAsync(payload);

        this.usersService.addSession(user, access_token);

        return {
            access_token,
        };
    }

    async signOut(name) {
        const user = await this.usersService.findOne(name);
        await this.usersService.removeSession(user);
        return true;
    }

    
}
