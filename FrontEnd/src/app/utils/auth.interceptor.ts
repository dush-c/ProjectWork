import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {JWTService} from "../services/jwt.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtSrv: JWTService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.jwtSrv.getToken();

    const authReq = authToken
      ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      })
      : req;

    return next.handle(authReq);
  }
}
