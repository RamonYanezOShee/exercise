import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';


@Injectable()
export class Errorinterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
                
        const now = Date.now();
        const userAgent = context.switchToHttp().getRequest().headers['user-agent'];
        const ct = context.switchToHttp().getRequest().headers['Content-type'];
        
        
        
        //console.log(context.switchToHttp().getRequest())
        console.log(context.switchToRpc.toString)
        
        //console.log(userAgent);
        //console.log(ct);

        // const current: any = context;
        // const query = context.switchToHttp().getRequest().query;

        
        
        return next
          .handle()
          .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
          );




        /*
        if (current.contextType === "graphql") {
            return next
                .handle()
                .pipe(
                    tap(() => this.logger.log(`graphql-resolver: ${current.handler.name} +${Date.now() - now}ms`)),
                );

        }
        */
                
        /*
        console.log('Before...');    
        const now = Date.now();
        return next
          .handle()
          .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
          );
          */
      }
}
