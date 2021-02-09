import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit {

  currQuestion:any;
  usersList = [];
  myUser = {
    firstName : "",
    lastName : "",
    emailID : "",
    result : {}
  }
  isQuiz=false;

  quiz:any;
  

  constructor(private myRouter: Router, private http : HttpClient) { }

  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem("ssid")){
      if(sessionStorage.getItem("quizId"))
      {
        //console.log(sessionStorage.getItem("quizId"))
        this.getUserDetails()
      }
      else{
        //this.getUserDetails()
        this.navigateTo("");
      }
    }
    else{
      this.navigateTo('login')
    }
  }

  getOptionColor(question, option){
    if(question.correctOption == option)
      return "correct-option"; 
    return "";
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  setCurrQuestion(question, userOption){
    this.currQuestion.correctOption = question.correctOption
    this.currQuestion.difficulty = question.difficulty
    this.currQuestion.option1 = question.option1
    this.currQuestion.option2 = question.option2
    this.currQuestion.option3 = question.option3
    this.currQuestion.option4 = question.option4
    this.currQuestion.question = question.question
    this.currQuestion.questionId = question.questionId
    this.currQuestion.userOption = userOption
  }


  getDifficultyColor(difficulty){
    if(difficulty == "EASY")
      return "easy";
    else if(difficulty == "MED")
      return "med";
    return "hard";
  }

  async getUserDetails(){
    if(sessionStorage.getItem("ssid")){
      let quizId:string = sessionStorage.getItem("quizId")
      let url = "http://localhost:8080/getPlayers?quizId="+quizId;
      console.log(url)
      let userList:any = await this.http.get(url).toPromise();
      url = "http://localhost:8080/getQuiz?quizId="+quizId;
      this.quiz =  await this.http.get(url).toPromise();
      this.isQuiz = true;
      console.log(userList)
      
      for(let i=0; i<userList.length; i++){
        for(let j=0; j<userList[i].quizResultList.length; j++){
          if(userList[i].quizResultList[j].quiz.quizId ==quizId){
            this.myUser.firstName = userList[i].firstName;
            this.myUser.lastName = userList[i].lastName;
            this.myUser.emailID = userList[i].emailID;
            this.myUser.result = userList[i].quizResultList[j];
            //console.log(this.quiz)
            break;

          }
        }
        
        let tempUser = JSON.parse(JSON.stringify(this.myUser));

        this.usersList.push(tempUser);
      }
      console.log(this.usersList)
    }//Not A User
    else{
      this.navigateTo("login")
    }
    
  }

  getUserReport(result){
    sessionStorage.setItem("resultId", JSON.stringify(result));
    sessionStorage.setItem("hostCheck", "true");
    this.navigateTo('result')
  }

  async deleteQuiz(){
    if(this.quiz){
    let quizId:string = this.quiz.quizId;
    let url = "http://localhost:8080/delQuiz?quizId="+quizId;
    await this.http.get(url).toPromise();
    url = "http://localhost:8080/login";
    
    let user = JSON.parse(sessionStorage.getItem("ssid"));
    let data = { emailID : user.emailID, password : user.password }
    user = await this.http.post(url, data).toPromise();
    sessionStorage.removeItem("ssid")
    console.log(user)
    sessionStorage.setItem("ssid", JSON.stringify(user))
    this.navigateTo('')
    }
    else{
      console.log("Error")
    }
  }
}
