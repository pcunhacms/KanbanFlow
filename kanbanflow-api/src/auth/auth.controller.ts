import { Controller, Body, Post, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { AuthService } from './auth.service';


import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
        
    }

    @Post('login')
    login(
        @Body() loginDto: LoginDto,
    ) {
        return this.authService.login(
            loginDto,
        );
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() req: any) {
        return req.user;
    }
}
