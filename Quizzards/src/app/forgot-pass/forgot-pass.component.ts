import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../entity/user';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor (private myRouter: Router, private http : HttpClient, private fb : FormBuilder) {
    
  }

  checkEmail = false;
  logErr = false;
  isSumbitEmail = false;
  isSumbitOTP = false;
  canChangePass = false;
  otpSend = false;
  errMsg:string;
  isError=false;

  email:string;

  public checkCredentials = false;
  
  public fbFormGroup = this.fb.group({
    emailID : ["", [Validators.required, Validators.email]],
    OTP : [""]
  })

  public chanagePas = this.fb.group({
    rePass : ["", [Validators.required]]
  })


  user : User = new User();
  navigateTo(page){
    this.myRouter.navigate([page])
  }

  async loginProcessHere(){
    
  }

  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if (sessionStorage.getItem('ssid')) {

      this.navigateTo('')
    }
    else {
    }
  }

  async submitEmail(){
    this.checkEmail = false;
    const url = "http://localhost:8080/sendOTP";
    this.email = this.fbFormGroup.value.emailID;
    let data = { emailId : this.fbFormGroup.value.emailID, status : "forgot"}
    let result:any = await this.http.post(url, data).toPromise();
    //console.log(result)
    if(result.status == "otpsent"){
      this.otpSend = true;
      setTimeout(() => {
        this.otpSend = false;
        this.isSumbitEmail = true;
        this.fbFormGroup.controls['emailID'].disable()
      }, 2000);
    }
    else{
      this.checkEmail = true;
    }
    
  }

  async submitOTP(){
    const url = "http://localhost:8080/verifyMail";
    //console.log(this.fbFormGroup.value.emailID+" " + this.fbFormGroup.value.OTP)
    let userData = this.fbFormGroup.value
    let data = { emailId : this.email , userOTP : userData.OTP }
   // console.log(data)
    let result:any = await this.http.post(url, data).toPromise();
    //console.log(result)
    if(result.status == "verified"){
      this.isSumbitOTP = true;
      this.canChangePass = true;
    }
    else if(result.status == "invalid"){
      this.isError=true;
      this.errMsg = "Invalid OTP please try again"
      setTimeout(() => {
        this.isError = false;
      }, 3000);
    }
    else{
      
      this.isError=true;
      this.errMsg = "OTP expired please try again"
      setTimeout(() => {
        this.isError = false;
        this.checkEmail = false;
        this.logErr = false;
        this.isSumbitEmail = false;
        this.isSumbitOTP = false;
        this.canChangePass = false;
        this.otpSend = false;
      }, 3000);
    }
    
  }

  async changePassword(){
   // console.log(this.user.password + " " + this.chanagePas.value.rePass)
    if(this.user.password == this.chanagePas.value.rePass){
      const url = "http://localhost:8080/changePass"
      let sendData = { emailId : this.email, password : this.user.password }
      //console.log(sendData)
      let result: any = this.http.post(url, sendData).toPromise()
      this.navigateTo('login')
    }
    else{
      this.isError = true;
      this.errMsg = "Passwords did not match Please try again!"
    } 
  }

}
