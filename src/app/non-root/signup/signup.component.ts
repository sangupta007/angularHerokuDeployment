import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";

import {Helper} from "../../helper.service";
import {Global} from "../../Global.service";
import {SiteUser} from "../../models";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  @ViewChild('f') form;
  showErrorMessage = false;
  helper_message = "";
  isItSignUpPage:boolean = false;
  makeGetRequestForFaceBook(  ){
    console.log('asking for facebook');;
    this.helper.makeGetRequest('auth/facebook').subscribe((value)=>{console.log(value)});
  }
  showErrorMessageForThreeSec(message:string){
    this.helper_message=message;
    this.showErrorMessage = true;
    setTimeout(()=>{this.showErrorMessage=false},3000);
  }
  onSubmit() {

    //Sign up user
    console.log(this.form);
    if(!this.form.valid){
      // this.showErrorMessage=true;
      // this.helper_message = "Please fill the form correctly";
      this.showErrorMessageForThreeSec("Please fill the form correctly");;
      return;
    }

    if(this.form.value.password!==this.form.value.confirm_password){
      this.showErrorMessageForThreeSec("Passwords must match");
      return;
    }

    this.showErrorMessageForThreeSec("Sending details to server...");
    // let user:SiteUser = new SiteUser("","tempUsername",this.form.value.username, this.form.value.email,this.form.value.password);
    let user:SiteUser = {userName:this.form.value.username, fullName:this.form.value.full_name, password:this.form.value.password, email:this.form.value.email};


    this.helper.signup(user) .subscribe((value:any) => {

      console.log(value);
      if(value.problem_message){
        console.log(value.problem_message);
        this.helper_message = value.problem_message;
        this.showErrorMessage = true;
        setTimeout(()=>{this.showErrorMessage=false},5000);
        return;
      }


      if(value.message==='user created'){
        this.helper_message = 'Sign Up done.Logging in!';
      }
      //after sign up is done, log user in
      const user:SiteUser = {userName: this.form.value.username, email:this.form.value.email,password:this.form.value.password};
      this.helper.login(user).subscribe(
        (data:any) =>{
          console.log('saved in local stogare',data);
          localStorage.setItem('token',data.token);
          localStorage.setItem('userID',data.user._id);
          localStorage.setItem('fullName',data.user.fullName);
          // this.router.navigateByUrl('/');
          this.router.navigate([this.global.previousSRPURL],{queryParams:this.global.previousSRPQueryParams});
          this.global.setLoggedInUserDetails(user);
          this.helper.showNotificationBarEvent.emit({message:'Signup done. You are logged in'});
        },
        error => {console.log(error)}
      );

    },
      //if error during login
      (err) => {

        this.helper_message = err.problem_message;
        console.log(err);
    });




}
  constructor(private helper:Helper, private router:Router, public global:Global, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.data.subscribe((data:Data)=>{
        console.log(data);
        this.isItSignUpPage = data.isItSignUpPage;;
      });
      this.global.showSearchBarBoolean=false;
  }

}
