import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ImagesComponent } from '../components/images/images.component';


@Injectable()
export class ImageDetailGuard {
    private firstNavigation = true;

    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.firstNavigation) {
            this.firstNavigation = false;
            if (route.component != ImagesComponent) {
                this.router.navigate(["/"]);
                return false;
            }
        }
        return true;
    }
}