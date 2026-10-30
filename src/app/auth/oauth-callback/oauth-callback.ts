import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Authservice } from '../../services/authservice';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Signing in...</p>`
})
export class OAuthCallbackComponent implements OnInit {

  constructor(
    private authservice: Authservice,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      //console.log('OAuth callback started');

      const result = await this.authservice.startOAuthLogin();

      if (!result) {
        //console.error('Google authentication failed');
        await this.router.navigate(['/login']);
        return;
      }

      // Wait for the .NET backend response
      const tokens = await firstValueFrom(result);

      // console.log('Backend login successful');
      // console.log('Backend response:', tokens);

      // Save your application's JWT tokens
      this.authservice.saveToken(tokens);

      // Navigate after successfully saving the tokens
      const navigated = await this.router.navigate(['/home']);
      //console.log('Navigation successful:', navigated);

    } catch (error) {
      //console.error('OAuth login or navigation failed:', error);
      await this.router.navigate(['/login']);
    }
  }
}

