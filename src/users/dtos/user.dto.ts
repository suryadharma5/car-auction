// Class Dto to show data that need to be shown

// Decorator yang menandakan bahwa property ini akan dishow
import { Expose } from "class-transformer"

export class UserDto {
    @Expose()
    id: number

    @Expose()
    email: string
}