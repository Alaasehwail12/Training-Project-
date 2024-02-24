import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { BookModalComponent } from './book-modal/book-modal.component';
import { WarningModalComponent } from './warning-modal/warning-modal.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { SharedService } from './shared/shared.service';
import { UserService } from './user/user.service';
import { BookService } from './book/book.service';
import { WarningCountComponent } from './warning-count/warning-count.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    HomeComponent,
    BookModalComponent,
    WarningModalComponent,
    UserBooksComponent,
    WarningCountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    TableModule,
  ],
  providers: [SharedService,
              UserService,
              BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
