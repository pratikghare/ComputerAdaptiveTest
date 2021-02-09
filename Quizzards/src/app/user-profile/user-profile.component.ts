import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user : User = new User();

  constructor(private myRouter: Router, private http : HttpClient) { }


  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem("ssid")){
      this.user = JSON.parse(sessionStorage.getItem("ssid"));
    }
    else{
      this.navigateTo("login");
    }
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  logoutSession(){
    sessionStorage.removeItem("ssid");
    this.navigateTo('login');
  }

  updateDetails(){
    
  }
}
