import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private myRouter: Router, private http : HttpClient, private fb : FormBuilder) { }

  
  emailID:string;
  public fbFormGroup = this.fb.group({
    firstName :  ["" , Validators.required],
    lastName :  ["" , Validators.required],
    emailID :  ["" ,  [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password :  ["" , [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    contact : ["", Validators.required],
    rePass : ["", Validators.required],
    gender : []
  })

  public checkEmailForm = this.fb.group({
    emailID : ["" ,  [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    userOTP : [""]
  })

  public emailOTP = true;
  public showOTP = false;
  public otpErr = false;
  public sendOTP = false;
  public checkEmail = false;
  public checkPass = false;

  errMsg:string;

  isEmailSubmitted = true;

  ngOnInit(): void {
    if (sessionStorage.getItem('ssid')) {
      this.navigateTo('')
    }
    else {
      
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    }
  }

  navigateTo(page){
    this.myRouter.navigate([page])
  }

  async registerProcess(){
    const addurl = "http://localhost:8080/register"
    const userData = this.fbFormGroup.value
    //console.log(userData)
    
    if(userData.password != userData.rePass){
      this.checkPass = true
      return
    }
    else this.checkPass = false
    //console.log(userData)
    const sendData = { firstName : userData.firstName, lastName : userData.lastName, emailID : this.emailID,
    password : userData.password, gender : userData.gender, contact : userData.contact,  quizResultList : [], hostedQuiz : [], status : false, admin : false}
    let result : any = await this.http.post(addurl, sendData).toPromise()
    console.log(result)
    if(result.status)
      this.navigateTo("login")
    else
      this.checkEmail = true
    /*
    let checkUserExist : any = await this.http.post(checkUrl, userData).toPromise
    if(checkUserExist.opr){
      this.checkEmail = true
      
    }
    else{
      }
    }*/
    
  }

  async submitOTP(){
    this.emailID = this.checkEmailForm.value.emailID;
    if(this.isEmailSubmitted){  
      const OTPurl = "http://localhost:8080/sendOTP";
      let data =  { emailId : this.checkEmailForm.value.emailID, status : "register" }
      let result : any = await this.http.post(OTPurl, data).toPromise();
      console.log(result)
      if(result.status == "false"){
        this.checkEmail = true;
        setTimeout(() => {
          this.checkEmail = false;
        }, 3000);
      }
      else if(result.status = "otpsent"){
        this.sendOTP = true;
        setTimeout(() => {
          this.sendOTP = false;
          this.showOTP = true;
          this.isEmailSubmitted = false;
        }, 3000);
      }
    }

    else{
      const OTPurl = "http://localhost:8080/verifyMail";
      let data =  { emailId : this.checkEmailForm.value.emailID, userOTP : this.checkEmailForm.value.userOTP }
      let result : any = await this.http.post(OTPurl, data).toPromise();
      console.log(result)
      if(result.status == "invalid"){
        console.log("Invalid")
        this.errMsg = "Invalid OTP! Please try again.";
        this.otpErr = true;
        setTimeout(() => {
          this.otpErr = false;
        }, 3000);
      }
      else if(result.status == "verified"){
        console.log("verified")
        this.emailOTP = false;
        this.fbFormGroup.controls['emailID'].setValue(this.checkEmailForm.value.emailID);
        this.fbFormGroup.controls['emailID'].disable();
      }
      else if(result.status == "expired"){
        console.log("expired")
        this.errMsg = "OTP expired! Please try again.";
        this.otpErr = true;
        setTimeout(() => {
          this.otpErr = false;
          this.emailOTP = true;
          this.showOTP = false;
          this.sendOTP = false;
          this.checkEmail = false;
          this.checkPass = false;
        }, 3000);
        
      }
    }
  }
}
