export class User {
    email: string;
    password: string;
  
    constructor(email: string = '', password: string = '') {
      this.email = email;
      this.password = password;
    }
}

export const loginSubmit = (user: User) => {
    console.log(user);
}