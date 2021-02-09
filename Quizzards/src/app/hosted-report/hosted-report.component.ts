import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hosted-report',
  templateUrl: './hosted-report.component.html',
  styleUrls: ['./hosted-report.component.css']
})
export class HostedReportComponent implements OnInit {
  quizResultList=[];

  correct = 0;
  constructor(private myRouter : Router) { }
  textDisplay = false;
  checkDisp = true;
  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem("ssid")){
      let user = JSON.parse(sessionStorage.getItem("ssid"))
      this.quizResultList = JSON.parse(JSON.stringify(user.hostedQuiz))
      console.log(this.quizResultList)
    }
    else{
      this.navigateTo("login")
    }
  }
  myCount=0;


  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  logoutSession(){
    sessionStorage.removeItem("ssid");
    sessionStorage.removeItem("resultId")
    this.navigateTo('login');
  }

  displayText(i){
    this.myCount = i;
    if(this.checkDisp){
      //console.log("display")
      setTimeout(()=>{this.textDisplay = true}, 400);
      //console.log(this.textDisplay)
      this.checkDisp = false;
    }
  }
  hideText(i){
    if(!this.checkDisp){
      //console.log("hide")
      setTimeout(()=>{this.textDisplay = false}, 400);
      //console.log(this.textDisplay)
      this.checkDisp = true;
    }
  }

  displayAnimate(i){
    if(this.myCount == i){
      if(this.textDisplay)
      return "show";
    }
    
    return "dns";
  }

  getResult(quiz){
    sessionStorage.setItem("quizId", JSON.stringify(quiz.quizId))
    this.navigateTo('leaderboards')
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
