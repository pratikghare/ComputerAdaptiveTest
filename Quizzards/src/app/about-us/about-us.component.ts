import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  isLoggedIn=false;
  userName:string;
  constructor(private myRouter : Router) { }

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

}
