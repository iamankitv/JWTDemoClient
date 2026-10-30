import { AuthConfig } from 'angular-oauth2-oidc';

export const googleAuth: AuthConfig = {
// The URL of the Identity Provider
  issuer: 'https://accounts.google.com',
 
  strictDiscoveryDocumentValidation: false,

 // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/signin-google',
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '400749319981-vohrk729br3soq0biohf4ofbbrk9rdij.apps.googleusercontent.com',
  // This is a new feature of OAuth 2.0 that allows the client to request specific scopes of access from the user
  scope: 'openid profile email',

// ask the user to select an account every time they log in
  customQueryParams: {
    prompt: 'select_account' 
  },
  showDebugInformation: true,
};
