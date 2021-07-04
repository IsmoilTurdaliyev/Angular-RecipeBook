import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { recipeService } from "../recipes/recipe.service";
import { User } from "./auth.modal";

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private expirationToken;
    constructor(private http: HttpClient, private router: Router, private recipeSrc: recipeService) { }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH4hY8912BHezmOw6if97uRP0CHVRjmvA',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(res => {
                this.handleAuth(res.email, res.localId, res.idToken, res.expiresIn)
            }))
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH4hY8912BHezmOw6if97uRP0CHVRjmvA',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(res => {
                    this.handleAuth(res.email, res.localId, res.idToken, res.expiresIn)
                }))
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        this.expirationToken = null;
        this.recipeSrc.clearRecipes()

    }



    private handleAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: string
    ) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate)
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(new Date(expirationDate).getTime() - new Date().getTime())
    }
    
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "Unknown error has occured!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = "E-mail has occured!";
                break;
            case 'EMAIL_NOT_FOUND': errorMessage = "E-mail does not exists!";
                break;
            case 'INVALID_PASSWORD': errorMessage = "Password is not correct!";
                break;
            case 'USER_DISABLED': errorMessage = "User disabled by Admin";
                break;
        }
        return throwError(errorMessage)
    }

    autoLogin() {
        const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData)return;
        const loadedUser = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));
        this.user.next(loadedUser)
        this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
    }

    autoLogout(expirationduration: number){
        this.expirationToken = setTimeout(() => {
            this.logout();
        }, expirationduration);
    }
}