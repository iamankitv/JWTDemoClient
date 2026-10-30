export interface IApiResponse {
result: boolean;
message: string;
data: any;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}