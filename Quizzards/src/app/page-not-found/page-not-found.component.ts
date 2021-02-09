import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private myRouter : Router, private fb : FormBuilder) { }

  ngOnInit(): void {
  }
  navigateTo(path){
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    this.myRouter.navigate([path]);
  }

  logoutSession(){
    sessionStorage.removeItem('ssid');
  }

}
