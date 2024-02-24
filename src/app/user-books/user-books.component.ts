import { Component, Inject } from '@angular/core';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared/shared.service';
import { BookService } from '../book/book.service';
import { Book } from '../book/book';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WarningModalComponent } from '../warning-modal/warning-modal.component';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent {

  username!:any;
  userId!:number;
  firstname!:string;
  lastname!:string;
  books:Book[]=[];
  modalDialog: MatDialogRef<WarningModalComponent, any> | undefined;

  constructor(private userService:UserService, private bookService:BookService,
    private sharedService:SharedService, private matDialog: MatDialog){

      this.putUserInfo()
    }

  ngOnInit(){

    console.log(this.sharedService.currentUser)
    this.username = this.sharedService.currentUser;

    this.userService.getIdByEmail(this.username).subscribe(
      (data:number) =>{
                this.userId = data;
                console.log(this.userId);
                this.bookService.getBooksForUser(this.userId).subscribe(
                  (data:Book[]) =>{
                          this.books = data;
                          console.log(data)
                  }
                )
      }
    )
        
  }

  updateUser(){
          this.userService.updateUser(this.userId,this.firstname,this.lastname).subscribe(
            (data)=>{
              console.log(data);
            }
          )
  }

  onUnReserve(bookId: number){
    this.modalDialog = this.matDialog.open(WarningModalComponent,
      {
        data: { bookId: bookId}
      }
      );
  }

  putUserInfo(){

    this.userService.getFirstName(this.sharedService.currentUser).subscribe(
      (data: string) => {
        this.firstname = data;
      }
    )

    this.userService.getLastName(this.sharedService.currentUser).subscribe(
      (data: string) => {
        this.lastname = data;
      }
    )
  }

}
