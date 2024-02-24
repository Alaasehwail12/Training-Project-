import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bookService: BookService){}

  UnReserveBook(){
    this.bookService.unReserveBook(this.data.bookId).subscribe(
                (data)=>{
                  console.log(data);
                }
              )
  }

}
