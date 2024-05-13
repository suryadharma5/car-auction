import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

interface ClassConstuctor {
    // any class
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstuctor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        // Request Interceptor
        console.log("Request Interceptor", context)

        return handler.handle().pipe(
            map((data: any) => {
                // Response Interceptor
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}