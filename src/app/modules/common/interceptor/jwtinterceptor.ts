import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "src/app/modules/common/service/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        
        // Only add token if it exists and is not expired
        if (token && this.jwtService.isLoggedIn() && this.shouldAddToken(req.url)) {
            req = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${token}`)
            });
        }
        
        return next.handle(req);
    }

    private shouldAddToken(url: string): boolean {
        const protectedRoutes = [
            "/api/admin",
            "/api/order",
            "/api/profile"
        ];
        
        return protectedRoutes.some(route => url.startsWith(route));
    }
}