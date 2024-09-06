import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, RefreshGuard } from './auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { signInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    signOut(@Request() req) {
        return this.authService.signOut(req.name);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @ApiBearerAuth()
    @UseGuards(RefreshGuard)
    @HttpCode(HttpStatus.OK)
    @Get('refresh')
    refresh(@Request() req) {
        const username = req.user.name;
        const refresh_token = req.refresh_token;
        return this.authService.refreshToken(username, refresh_token);
    }
}
