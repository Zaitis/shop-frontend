import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  adminAccess = false;
  private jwtHelper = new JwtHelperService();

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  notExpired(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  getTokenExpirationDate(): Date | null {
    const token = this.getToken();
    return token ? this.jwtHelper.getTokenExpirationDate(token) : null;
  }

  public setAdminAccess(adminAccess: boolean){
    this.adminAccess = adminAccess;
  }

  public getAdminAccess(): boolean {
    return this.adminAccess;
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.adminAccess = false;
  }
}