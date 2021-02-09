import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn=false;

  constructor(private myRouter : Router, private fb : FormBuilder, private http : HttpClient) { }
  public fbFormGroup = this.fb.group({
    quizCode :  ["" , [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]]
  })

  public searchForm = this.fb.group({
    quizDomain :  ["" , [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")]]
  })

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

  async joinQuiz(){
    let quizCode:string = this.fbFormGroup.value.quizCode

    sessionStorage.setItem('quizCode', quizCode);
    this.navigateTo('quiz');
  }

  async searchByDomain(){
    let quizDomain = this.searchForm.value.quizDomain;
    // const url = "localhost:8080/getDomains?domain="+quizDomain;
    // console.log(url)
    // let result;
    // try {
    //   result = await this.http.get(url).toPromise()
    //   sessionStorage.setItem("searchResult", JSON.stringify(result))
    //   this.navigateTo('search-result')

    // } catch (error) {
    //   this.navigateTo('pnf')
    // }
    sessionStorage.setItem("quizDomain", quizDomain)
    this.navigateTo('search-result')

  }

}
