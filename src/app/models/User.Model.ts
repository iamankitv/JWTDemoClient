export class UserModel {
    userId: string;
    password: string;

    constructor(userId: string, password: string) {
        this.userId = '';
        this.password = '';
    }
}

export interface LoginRequest {
  username: string;
  password: string;
}