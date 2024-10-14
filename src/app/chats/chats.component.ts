import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';
import { alert } from '@nativescript/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-chats',
  templateUrl: './chats.component.html',
})
export class ChatsComponent implements OnInit {
  chats$: Observable<Chat[]>;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.chats$ = this.chatService.getChats();
  }

  onNewChat(): void {
    alert({
      title: "New Chat",
      message: "This feature is coming soon!",
      okButtonText: "OK"
    });
  }

  onLogout(): void {
    this.authService.logout()
      .then(() => {
        this.routerExtensions.navigate(['/login'], { clearHistory: true });
      })
      .catch(error => {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
      });
  }
}