import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable, merge } from "rxjs";
import { tap } from 'rxjs/operators';


@Injectable()
export class Errorinterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const ct = context.switchToHttp().getRequest().headers['content-type'];
        const method = context.switchToHttp().getRequest().method;

        // THIS WILL CATCH 400 ERROR WHEN POST OR PUT HAVE NO Content-Type:application/json 
        if(ct!='application/json' && (method=='POST' || method=='PUT')){throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);}
        
                                                        
        return next
          .handle()
          .pipe(
            tap(),
          );

      }
}
