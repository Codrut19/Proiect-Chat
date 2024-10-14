import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { firebase } from '@nativescript/firebase-core'
import { firebaseConfig } from './firebase.config'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChatsComponent } from './chats/chats.component'
import { ChatDetailComponent } from './chats/chat-detail.component'
import { LoginComponent } from './auth/login.component'
import { AuthService } from './auth/auth.service'

firebase().initializeApp(firebaseConfig);

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [AppComponent, ChatsComponent, ChatDetailComponent, LoginComponent],
  providers: [AuthService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}