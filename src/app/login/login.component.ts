import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

username: any;
password!: string;
checkEmail: string='';
checkPassword: string='';
email!:any;

constructor(private userService: UserService, private router: Router, private sharedService: SharedService){}


checkLogin(){
 
        return this.userService.checkLogin(this.username , this.password).subscribe(
          (data:string) =>{
            if(data === 'not registered'){
                    this.checkEmail = 'not registered';
            }
             if( data === 'correct password'){
                   this.sharedService.currentUser = this.username;
                   this.router.navigate(['/home']);
            }
             if(data === 'wrong password'){
                  this.checkPassword = 'wrong password';
            }
          }
        )

}

    goToHome(){
      this.router.navigate(['/home']);
    }

    clearText() {
      this.checkEmail = '';
      this.checkPassword = '';
    }
}
