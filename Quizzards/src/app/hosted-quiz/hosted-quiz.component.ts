import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserQuestion } from '../entity/user-question';
import { isSyntaxError } from '@angular/compiler';

@Component({
  selector: 'app-hosted-quiz',
  templateUrl: './hosted-quiz.component.html',
  styleUrls: ['./hosted-quiz.component.css']
})
export class HostedQuizComponent implements OnInit {

  quiz = {
    quizId : "",
    quizTitle : "",
    quizDomain : "",
    quizDuration : "",
    questions : []
  }

  scoredMarks = 0;
  totalMarks = 0;

  quizResult = {
    resultId:0,
    adaptive:false,
    answers:[],
    quiz:{},
    scoredMarks:0,
    totalMarks:0
  };

  answersList = [];

  answer = {
    ansId:0,
    question:{},
    userOption: ""
  }

  
  questionsList = "";
  quizQuestions:any;
  currQuestion = {
    questionId : "",
    question : "",
    option1 : "",
    option2 : "",
    option3 : "",
    option4 : "",
    correctOption : "",
    userOption : "",
    difficulty : "",
    domain : ""
  }

  count=0;
  quizId;
  index = 0;
  isNext = true;
  constructor(private myRouter: Router, private http : HttpClient) { }

  isNull=false;
  playAgain = false;
  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem("ssid")){
      this.getQuiz();
    }
    else{
      this.navigateTo("login")
    }
    // this.getQuiz();
  }

  userResult:any; // to store result from session object or database
  
  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  async getQuiz(){
    
    
    let user = JSON.parse(sessionStorage.getItem("ssid"));

    if(sessionStorage.getItem('quizCode'))
    {
      this.quizId = sessionStorage.getItem('quizCode');
      sessionStorage.removeItem('quizCode');
      let quizCode:string = this.quizId;
      this.checkHost(this.quizId, user);
      let userEmail:string = user.emailID;
      let url = "http://localhost:8080/checkResult?emailID="+userEmail+"&quizId="+quizCode;
      console.log(url)
      this.userResult = await this.http.get(url).toPromise()
      if(this.userResult){
        console.log("Found")
        this.playAgain = true;
      }

      const url1 = "http://localhost:8080/getQuiz?quizId="+this.quizId;
      let result :any;
      try {
        result = await this.http.get(url1).toPromise()
        this.isNull=true;
        console.log(result)
        this.quiz.quizTitle = result.quizTitle;
        this.quiz.quizId = result.quizId;
        this.quiz.quizDomain = result.quizDomain;
        this.quiz.quizDuration = result.quizDuration;
        
        this.quizQuestions = result.questions;
        console.log(this.quizQuestions.length)
        //console.log(this.quizQuestions[this.index])
        this.currQuestion = this.quizQuestions[this.index++];
      } 
      catch (error) {
        this.navigateTo('')
      }      
      
    }
    else
      this.navigateTo('')
    //this.quiz.question = [];
    
  }

  checkHost(quizId, user){
    for(let i=0; i<user.hostedQuiz.length; i++){
      if(user.hostedQuiz[i].quizId == quizId){
        sessionStorage.setItem("quizId", quizId);
        this.navigateTo('leaderboards');
      }
    }
  }

  nextQuestion(userOption){
    //console.log("Prev Q")
    //console.log(this.currQuestion)
    this.currQuestion.userOption = userOption.target.innerText;
    this.storeQuestionDetails();
    if(this.currQuestion.userOption == this.currQuestion.correctOption){
      console.log("Correct")
      if(this.currQuestion.difficulty == "EASY"){
        this.scoredMarks += 1;
        this.totalMarks += 1;
      }
      if(this.currQuestion.difficulty == "MED"){
        this.scoredMarks += 2;
        this.totalMarks += 2;
      }
      if(this.currQuestion.difficulty == "HARD"){
        this.scoredMarks += 3;
        this.totalMarks += 3;
      }
    } 
    else{
      console.log("Wrong")
      if(this.currQuestion.difficulty == "EASY"){
        this.totalMarks += 1;
      }
      if(this.currQuestion.difficulty == "MED"){
        this.totalMarks += 2;
      }
      if(this.currQuestion.difficulty == "HARD"){
        this.totalMarks += 3;
      }
    }
    if(this.index < this.quizQuestions.length)
    {
      //console.log(this.index < this.quizQuestions.length)
      //console.log(this.index + "   " + this.quizQuestions.length)
      this.isNext = true;
      this.setCurrQuestion(this.quizQuestions[this.index++])
      //console.log(this.currQuestion)
    }
    else{
      this.isNext = false;
      //console.log("ELSE")
    }
  }

  storeQuestionDetails(){
    //console.log(this.currQuestion);
    this.questionsList = (JSON.stringify(this.currQuestion))
    let quesStr = (JSON.stringify(this.currQuestion))
    let question = JSON.parse(quesStr);
    this.answer.userOption = question.userOption;
    this.answer.question = question;
    if(this.playAgain)
      this.answer.ansId = this.userResult.answers[this.index-1].ansId;
    let ansStr = JSON.stringify(this.answer);
    this.answersList.push(JSON.parse(ansStr))
    this.quiz.questions.push(JSON.parse(this.questionsList))
    //console.log(this.quiz.questions)
    //console.log("moving to next question");
  }

  myList=[]

  async submitQuiz()
  {
    let user = JSON.parse(sessionStorage.getItem("ssid"));

    console.log(this.quiz)
    console.log(this.quiz.questions.length)
    this.quizResult.quiz = this.quiz;
    this.quizResult.answers = this.answersList;
    this.quizResult.scoredMarks = this.scoredMarks;
    this.quizResult.totalMarks = this.totalMarks;
    this.quizResult.adaptive = false;
    console.log(this.quizResult)
    if(this.playAgain){
      console.log(this.userResult)
      this.quizResult.resultId = this.userResult.resultId
      for(let i=0; i<user.quizResultList.length; i++){
        if(user.quizResultList[i].resultId == this.userResult.resultId){
          console.log("Value is Set")
          user.quizResultList[i] = this.quizResult;
          break;
        }
      }
    }
    else{
      console.log("New quiz")
      user.quizResultList.push(this.quizResult);
    }
    console.log(user)
    sessionStorage.setItem("ssid", JSON.stringify(user))
    sessionStorage.setItem("resultId", JSON.stringify(this.quizResult));
    this.navigateTo('result')
  }


  setCurrQuestion(currQuestion){
    this.currQuestion.questionId =  currQuestion.questionId;
    this.currQuestion.question = currQuestion.question;
    this.currQuestion.option1 = currQuestion.option1;
    this.currQuestion.option2 = currQuestion.option2;
    this.currQuestion.option3 = currQuestion.option3;
    this.currQuestion.option4 = currQuestion.option4;
    this.currQuestion.correctOption = currQuestion.correctOption;
    this.currQuestion.userOption = "";
    this.currQuestion.difficulty = currQuestion.difficulty;
    this.currQuestion.domain = currQuestion.domain;
  }


}
