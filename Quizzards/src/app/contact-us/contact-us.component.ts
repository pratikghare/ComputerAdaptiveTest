import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private myRouter : Router) { }
  isLoggedIn=false;
  isRecorded=false;
  userName:string;
  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem('ssid')){
      this.userName = JSON.parse(sessionStorage.getItem('ssid')).firstName;
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  logoutSession(){
    sessionStorage.removeItem('ssid');
    this.navigateTo('login')
  }


  submitResponse(){
    this.isRecorded=true;
    
  }
}
