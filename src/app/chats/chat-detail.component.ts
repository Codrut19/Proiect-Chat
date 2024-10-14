import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { Chat, Message } from './chat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ns-chat-detail',
  templateUrl: './chat-detail.component.html',
})
export class ChatDetailComponent implements OnInit {
  chat$: Observable<Chat>;
  messages$: Observable<Message[]>;
  newMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.chat$ = this.chatService.getChat(id);
    this.messages$ = this.chatService.getMessages(id);
  }

  onSendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Message = {
        senderId: '1', // Replace with actual user ID
        content: this.newMessage,
        timestamp: new Date().toISOString(),
        type: 'text',
      };
      this.chatService.addMessage(this.route.snapshot.params.id, message);
      this.newMessage = '';
    }
  }

  onCall(): void {
    console.log('Call functionality to be implemented');
  }

  onVideoCall(): void {
    console.log('Video call functionality to be implemented');
  }

  onAttachFile(): void {
    console.log('File attachment functionality to be implemented');
  }
}