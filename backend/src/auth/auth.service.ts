import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { User } from 'src/users/schemas/user.schema';

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

        const tokens = await this.getTokens(user);
        await this.usersService.addSession(user, tokens.refresh_token);

        return tokens;
    }

    async getTokens(user: User): Promise<{access_token: string, refresh_token: string}> {
        const payload = {
            name: user.name,
            sub: user._id.toString(),
        };

        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.refreshSecret,
            expiresIn: '7d',
        });
        return {
            access_token,
            refresh_token,
        };
    }

    async signOut(name) {
        const user = await this.usersService.findOne(name);
        await this.usersService.removeSession(user);
        return true;
    }

    async refreshToken(username: string, refreshToken: string) {
        const user = await this.usersService.findOne(username);
        if (!user || !user.token) {
            throw new ForbiddenException('Access Denied');
        }
        if (refreshToken !== user.token) {
            throw new ForbiddenException('Access Denied');
        }

        const tokens = await this.getTokens(user);
        await this.usersService.addSession(user, tokens.refresh_token);

        return tokens;
    }

    
}
