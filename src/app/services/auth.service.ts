import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/login';
    private isAuthenticated = false;
    private currentUser: any = null;

    constructor(private http: HttpClient) {
        // Check localStorage on init
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAuthenticated = true;
        }
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<any>(this.apiUrl, { username, password }).pipe(
            tap(response => {
                if (response.success) {
                    this.isAuthenticated = true;
                    this.currentUser = response.user;
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                }
            }),
            map(response => response.success),
            catchError(error => {
                console.error('Login error', error);
                return of(false);
            })
        );
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

    getUser() {
        return this.currentUser;
    }
}
