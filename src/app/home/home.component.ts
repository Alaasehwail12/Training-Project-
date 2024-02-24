import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book/book.service';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books: any[]=[];
  username:any;
  modalDialog: MatDialogRef<BookModalComponent, any> | undefined;

constructor(private router: Router, private bookService:BookService,
      private matDialog: MatDialog, private sharedService:SharedService){
  }
  goToHome(){
          this.router.navigate(['/home']);
  }

  ngOnInit(){
    console.log(this.sharedService.currentUser)
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
        console.log(data);
      }
    )
  }

  openBookModal(bookId: number){
      this.modalDialog = this.matDialog.open(BookModalComponent,
        {
          data: { bookId: bookId }
        }
        );
    }
  }
