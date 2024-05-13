import { Body, Controller, Delete, Get, Param, Post, Query, Patch, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password)
        return { message: 'User created successfully' }
    }

    @UseInterceptors(SerializeInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running')
        const user = await this.userService.findOne(parseInt(id))

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        try {
            return this.userService.remove(parseInt(id))
        } catch (error) {
            console.log(error)
        }
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }

}
