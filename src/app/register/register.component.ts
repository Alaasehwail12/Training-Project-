import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../vlaidator/custom-validators';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  passwordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'repeatPassword')]
  );

  modalDialog: MatDialogRef<ModalComponent, any> | undefined;


  emailForm: FormGroup;
  userForm: FormGroup;
  availableEmail!:string;

  user: User =  new User();

  constructor(private fb: FormBuilder , private userService: UserService,private matDialog: MatDialog) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      
    });

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['',[Validators.required]], 
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  } 
  ngOnInit(): void{
   
  }

  get passwordMatchError() {
    return (
      this.passwordForm.getError('mismatch') &&
      this.passwordForm.get('repeatPassword')?.touched
    );
  }

  addNewUser(){
      this.userService.addUser(this.user).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.error(error); 
          }
        )
  }

  
  openModal(){
    this.modalDialog = this.matDialog.open(ModalComponent);
  }

   alreadyExistEmail(){
    const email = this.userForm.get('email')?.value;
     this.userService.checkExistEmail(email).subscribe(
            (data: string) => {
              if(data === 'available'){
                this.availableEmail = 'available';
                console.log(data);
              }
              else if(data === 'taken'){
                this.availableEmail = 'taken';
                console.log(data);
              }
            }
          )
  }

}


