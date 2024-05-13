import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { UserDto } from "src/users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        // Request Interceptor
        console.log("Request Interceptor", context)

        return handler.handle().pipe(
            map((data: any) => {
                // Response Interceptor
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}