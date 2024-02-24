import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BookService } from '../book/book.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WarningModalComponent } from '../warning-modal/warning-modal.component';
import { Book } from '../book/book';
import { Inject } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../user/user.service';
import { ReservationService } from '../reservation/reservation.service';
import { WarningCountComponent } from '../warning-count/warning-count.component';


@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {

  book!:Book;
  reservedBook!:Book
  clicked:boolean = false;
  username:any;
  userId!:number;
  counter: number =0;
  reserved:boolean = false;


  modalDialog: MatDialogRef<WarningModalComponent, any> | undefined;
  modalCountDialog: MatDialogRef<WarningCountComponent, any> | undefined;

  constructor(private bookService: BookService, private matDialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: any, private sharedService: SharedService,
     public reservationService: ReservationService,
      private userService:UserService){}

  ngOnInit(){
   
    this.username = this.sharedService.currentUser;

    this.userService.getIdByEmail(this.username).subscribe(
      (data:number) =>{
                this.userId = data;
                console.log(this.userId);
      }
    )

      this.bookService.getBookById(this.data.bookId).subscribe(
        (data: Book) =>{
                this.book = data;
                console.log(this.data.bookId);
        }
      )
  }

  onReserve(){
    this.reservationService.reserve();
    this.addUserToBook();
  }

  addUserToBook(){
        this.bookService.addUserToBook(this.data.bookId,this.userId).subscribe(
          (data) => {
                console.log(data);
          }
      );
  }

  openWarningReserveModal(){ //count
    this.modalCountDialog = this.matDialog.open(WarningCountComponent);
  }

  openWarningUnReserveModal(){
    this.reservationService.unreserve();
    this.modalDialog = this.matDialog.open(WarningModalComponent,
      {
        data: { bookId: this.data.bookId}
      }
      );
  }

}
