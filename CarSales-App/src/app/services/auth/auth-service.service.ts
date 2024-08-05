import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl: string = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/${userId}`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId; 
    }
    return null;
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']); 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isUserRole(role: string): boolean {
    const userRole = this.getRoleFromToken();
    return userRole === role;
  }

  forgotPassword(email: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    return this.http.post(`${this.baseUrl}/forgot-password`, null, { params });
  }
  
  resetPassword(token: string | null, newPassword: string): Observable<any> {
    let params = new HttpParams()
      .set('token', token!)
      .set('newPassword', newPassword);
    return this.http.post(`${this.baseUrl}/reset-password`, null, { params });
  }
  getUserCounts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/count`);
}
}
