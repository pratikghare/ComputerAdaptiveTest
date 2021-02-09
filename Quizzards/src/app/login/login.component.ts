import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../entity/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User 
  constructor (private myRouter: Router, private http : HttpClient, private fb : FormBuilder) {
    
  }
  public checkEmail = false
  public logErr = false;

  public checkCredentials = false;
  
  public fbFormGroup = this.fb.group({
    emailID : ["", [Validators.required, Validators.email]],
    password : ["", [Validators.required]]
  })

  navigateTo(page){
    this.myRouter.navigate([page])
  }

  async loginProcessHere(){
    
    const userData = this.fbFormGroup.value
    const url = "http://localhost:8080/login"
    const sendData = {emailID : userData.emailID , password : userData.password}
    //console.log(sendData)
    let result : any = await this.http.post(url, sendData).toPromise()
    console.log(result)
    if(result.status){
      sessionStorage.setItem("ssid", JSON.stringify(result));
      this.navigateTo('')
    }
    else{
      this.checkCredentials = true;

    }
    
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

 

}
