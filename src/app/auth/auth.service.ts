import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): Promise<any> {
    return firebase().auth().signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, phoneNumber: string): Promise<any> {
    return firebase().auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Add phone number to user profile
        return userCredential.user.updateProfile({
          phoneNumber: phoneNumber
        });
      });
  }

  logout(): Promise<void> {
    return firebase().auth().signOut();
  }

  getCurrentUser() {
    return firebase().auth().currentUser;
  }
}