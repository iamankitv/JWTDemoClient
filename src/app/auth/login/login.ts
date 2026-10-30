import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/User.Model';
import { Authservice } from '../../services/authservice';
import { IApiResponse, TokenResponse } from '../../models/apiResponseModel';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  loginObj: UserModel = new UserModel('', '');
  isSubmitted: boolean = false;
  auth = inject(Authservice);
  router = inject(Router);
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Check if the user is already logged in by checking for the access token in local storage
    // If the access token exists, navigate to the home page
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.router.navigateByUrl('/home');
    }
  }

  submit() {
    this.isSubmitted = true;
    // Validate the form fields
    if (!this.loginObj.userId.trim() || !this.loginObj.password.trim()) {
      return;
    }

    /* Call the loginUser method from the Authservice to authenticate the user
     Use the loginObj to send the username and password to the backend
     Subscribe to the response and handle success and error cases
     On successful login, save the access token and refresh token in local storage
     Navigate to the home page*/

    this.auth.loginUser({ username: this.loginObj.userId, password: this.loginObj.password }).subscribe({
      next: (res: TokenResponse) => {
        this.auth.saveToken(res);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login Failed');
      }
    })
    //alert('UserId: ' + this.loginObj.userId + ' Password: ' + this.loginObj.password);
  }

  loginWithGoogle(){
    this.auth.initializeOAuthLogin();
  }
}
