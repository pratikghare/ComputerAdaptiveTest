import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private myRouter : Router, private fb : FormBuilder, private http : HttpClient) { }
  domainList:any;

  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")

    if(sessionStorage.getItem("ssid")){
      this.getData();
    }
    else
      this.navigateTo("login")
    
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  logoutSession(){
    sessionStorage.removeItem('ssid');
  }

  async getAdaptiveQuiz(domainId){
    //console.log("Called")
    //console.log(domainId)
    sessionStorage.setItem("domainId", domainId);
    sessionStorage.removeItem("quizDomain")
    this.navigateTo("adaptive-quiz")
  }

  async getData(){
    let quizDomain;
    //To receive domain name from search result
    if(sessionStorage.getItem("quizDomain"))
      quizDomain = sessionStorage.getItem("quizDomain");
    else  
      this.navigateTo('pnf')

    //sessionStorage.removeItem("quizDomain")
    
    let url = "http://localhost:8080/getDomains?domain="+quizDomain;
    try {
      let list = await this.http.get(url).toPromise()
      let str = JSON.stringify(list);
      this.domainList = JSON.parse(str)
      //console.log(this.domainList)
    } catch (error) {
      this.navigateTo('pnf')
    }
  }

  setBackground(str:string){
    if(str == "Core Java")
      return "java";
    else if(str == "Advanced Java")
    return "adv-java";
    else if(str == "Maths")
    return "maths";
    else if(str == "Algebra")
    return "algebra";
    else if(str == "Geometry")
    return "geometry";
    else if(str == "Science")
    return "science";
    else if(str == "Chemistry")
    return "chemistry";
    else if(str == "Physics")
    return "physics";
    else if(str == "Biology")
    return "biology";
    else if(str == "History")
    return "history";
    else if(str == "Geography")
    return "geography";
    else if(str == "Civics")
    return "civics";
    else if(str == "Data Structures")
    return "data-structure";
    else if(str == "ASDM")
    return "software-engg";
    else if(str == "Dot Net")
    return "dot-net";
    else if(str == "Advanced Web Programming")
    return "awp";
    else if(str == "MEAN Stack")
    return "mean-stack";
    else if(str == "Operating Systems")
    return "operating-system";
    else if(str == "MySQL")
    return "mysql";
    else
      return "default-bg";
  }

}
