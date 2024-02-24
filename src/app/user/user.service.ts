import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private addURL = "http://localhost:8080/api/v1/user/add";
  // localhost:8080/api/v1/user/findid?email=alaa@gmail.com

  constructor(private httpClient: HttpClient) { }

  addUser(user:User): Observable<Object>{
          return this.httpClient.post(`${this.addURL}` , user);
  }

  checkExistEmail(email: string): Observable<string> {
    return this.httpClient.get(`http://localhost:8080/api/v1/user/check?email=${email}`,{ responseType: 'text' })

  }
  
  checkLogin(email:string, password:string): Observable<string>{
     return this.httpClient.get(`http://localhost:8080/api/v1/user/logincheck?email=${email}&password=${password}`,{ responseType: 'text' })
  }

  getIdByEmail(email:string):Observable<number>{
    return this.httpClient.get<number>(`http://localhost:8080/api/v1/user/findid?email=${email}`);
  }

  updateUser(userId:number,firstname:string, lastname:string): Observable<Object>{
        return this.httpClient.put(`http://localhost:8080/api/v1/user/update?userId=${userId}&firstName=${firstname}&lastName=${lastname}`,null)
  }

  getFirstName(email:string):Observable<string>{
    return this.httpClient.get(`http://localhost:8080/api/v1/user/firstname?email=${email}`,{ responseType: 'text' })
  }

  getLastName(email:string):Observable<string>{
    return this.httpClient.get(`http://localhost:8080/api/v1/user/lastname?email=${email}`,{ responseType: 'text' })
  }

  
}
