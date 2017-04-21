import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _authenticationService: AuthenticationService, private router: Router) {}

    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //
    //     return true;
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }



    checkLogin(url: string): boolean {
            const currentStatus = this._authenticationService.isLoggedIn();
        if (currentStatus === true) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }

    }



}
