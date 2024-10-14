import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  isLoggingIn: boolean = true;

  constructor(private authService: AuthService, private routerExtensions: RouterExtensions) {}

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.routerExtensions.navigate(['/chats'], { clearHistory: true });
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      });
  }

  register() {
    if (!this.phoneNumber) {
      alert('Phone number is required for registration.');
      return;
    }
    this.authService.register(this.email, this.password, this.phoneNumber)
      .then(() => {
        alert('Registration successful. Please log in.');
        this.isLoggingIn = true;
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      });
  }
}