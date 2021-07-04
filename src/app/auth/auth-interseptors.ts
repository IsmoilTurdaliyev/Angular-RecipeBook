import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authSrv: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.authSrv.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) return next.handle(request);
                const moddifiedReq = request.clone({ params: new HttpParams().set('auth', user.token) });
                return next.handle(moddifiedReq)
            })
        )

    }
}