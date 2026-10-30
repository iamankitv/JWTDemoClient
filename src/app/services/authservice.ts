import { Injectable, inject } from '@angular/core';
import { LoginRequest, UserModel } from '../models/User.Model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse, TokenResponse } from '../models/apiResponseModel';
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuth } from '../auth/oauth-config';

@Injectable({
    providedIn: 'root'
})
export class Authservice {

    private baseUrl: string = 'http://localhost:5003/api/login';

    constructor(private http: HttpClient, private oauthService: OAuthService) {
        this.oauthService.configure(googleAuth);
    }

    // login method to authenticate the user and get the access token and refresh token
    loginUser(userObj: LoginRequest): Observable<TokenResponse> {

        const url = `${this.baseUrl}/login`;
        return this.http.post<TokenResponse>(url, userObj);
    }

    // method to save the access token and refresh token in local storage
    saveToken(token: TokenResponse) {
        localStorage.setItem('access_token', token.accessToken);
        localStorage.setItem('refresh_token', token.refreshToken);
    }

    // method to remove the access token and refresh token from local storage
    removeToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    // method to generate a new access token using the refresh token
    generateRefreshToken(): Observable<TokenResponse> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const url = `${this.baseUrl}/refresh-token`;
        return this.http.post<TokenResponse>(url, { refresh_token: refreshToken });
    }

    initializeOAuthLogin() {
        this.oauthService.loadDiscoveryDocument();
        this.oauthService.initLoginFlow();
    }

    
async startOAuthLogin() {
  await this.oauthService.loadDiscoveryDocumentAndTryLogin();

//   console.log('OAuth login completed');
//   console.log('Valid ID token:', this.oauthService.hasValidIdToken());

  if (!this.oauthService.hasValidIdToken()) {
    //console.error('Google ID token is not valid');
    return null;
  }

  const token = this.oauthService.getIdToken();
  //console.log('Google ID token retrieved');

  return this.http.post<TokenResponse>(
    'http://localhost:5003/api/oauth/login',
    { tokenId:token }
  );
}






}

