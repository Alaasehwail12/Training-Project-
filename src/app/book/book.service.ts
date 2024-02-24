import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  private getURL = "http://localhost:8080/api/v1/book/all";

  getBooks():Observable<any>{
          return this.httpClient.get<any>(this.getURL);
  }

  getBookById(bookId: number):Observable<Book>{
              return this.httpClient.get<Book>(`http://localhost:8080/api/v1/book/find?bookId=${bookId}`);
  }

  addUserToBook(bookId:number, userId:number):Observable<Object>{
          return this.httpClient.post(`http://localhost:8080/api/v1/book/addUserToBook?bookId=${bookId}&userId=${userId}`,null);
  }

  unReserveBook(bookId: number):Observable<Object>{
          return this.httpClient.put(`http://localhost:8080/api/v1/book/unreserve?bookId=${bookId}`,null)
  }

  getBooksForUser(userId:number):Observable<Book[]>{
        return this.httpClient.get<Book[]>(`http://localhost:8080/api/v1/book/find/user?userId=${userId}`)
  }

}
