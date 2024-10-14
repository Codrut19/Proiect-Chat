import { Injectable } from '@angular/core';
import { Chat, Message } from './chat.model';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-database';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatsSubject = new BehaviorSubject<Chat[]>([]);
  chats$: Observable<Chat[]> = this.chatsSubject.asObservable();

  constructor(private authService: AuthService) {
    this.initChats();
  }

  private initChats() {
    const userId = this.authService.getCurrentUser()?.uid;
    if (userId) {
      firebase().database().ref(`userChats/${userId}`).on('value', (snapshot) => {
        const chats = [];
        snapshot.forEach((childSnapshot) => {
          chats.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        this.chatsSubject.next(chats);
      });
    }
  }

  // ... rest of the methods remain the same
}