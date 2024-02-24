import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-book-lib';

  constructor(private httpClient: HttpClient, private router: Router){
  }
  
  ngOnInit(){
    this.enablePorts();
  }

  showNavbar() {
    return this.router.url !== '/login';
  }


  enablePorts(){
    this.httpClient.get('http://localhost:8080/user/check').subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
