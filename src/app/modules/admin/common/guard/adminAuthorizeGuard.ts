
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "src/app/modules/common/service/jwt.service";

@Injectable()
export class AdminAuthorizeGuard implements CanActivate {
   
    constructor(
        private jwtService: JwtService, 
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isLoggedIn = this.jwtService.isLoggedIn();
        const hasAdminAccess = this.jwtService.getAdminAccess();
        
        console.log("Guard checked - logged in:", isLoggedIn, "admin access:", hasAdminAccess);
        
        if (!isLoggedIn || !hasAdminAccess) {
            this.router.navigate(["/admin/login"]);
            return false;
        }
        
        return true;
    }
}
