import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  canPlay=true;
  hostCheck=false;
  correct=0;
  wrong=0;
  quizResult:any;
  quiz:any;
  questionsList = [];
  currQuestion = {
    correctOption :"",
    difficulty :"",
    option1 :"",
    option2 :"",
    option3 :"",
    option4 :"",
    question :"",
    questionId :"",
    userOption :""
  }
  answerList:any;
  accuracy;
  accuracyBar;
  constructor(private myRouter: Router, private http : HttpClient) { }

  ngOnInit(): void {
    this.updateUser();
    if(sessionStorage.getItem("resultId")){
      this.quizResult = JSON.parse(sessionStorage.getItem('resultId'))
      this.quiz = this.quizResult.quiz;
      //console.log(this.quizResult.answers[0].userOption)
      this.answerList = this.quizResult.answers;
      //console.log(this.answerList)
      for(let i=0; i<this.answerList.length; i++){
        this.setCurrQuestion(this.quizResult.answers[i].question, this.quizResult.answers[i].userOption);
        //console.log(this.currQuestion);
        let questionStr = JSON.stringify(this.currQuestion)
        let question = JSON.parse(questionStr)
        this.questionsList.push(question);
        //console.log(this.currQuestion.correctOption +" "+ this.currQuestion.userOption)
        if(this.currQuestion.correctOption == this.currQuestion.userOption) 
          this.correct++;
        else
          this.wrong++;            
      }
      console.log(this.questionsList)
      this.accuracy = this.quizResult.scoredMarks * 100 / this.quizResult.totalMarks
      this.accuracy = this.accuracy.toFixed(2);
      //this.accuracyBar = "width : "+this.accuracy+"% !important";

      let mytitle:string = this.quiz.quizTitle
      if(mytitle.includes("Adaptive"))
        this.canPlay = false;
    }
    else{
      this.navigateTo("")
    }
    if(sessionStorage.getItem("hostCheck")){
      this.hostCheck = true;
    }
      
  }

  getOptionColor(question, option){
    if(question.correctOption == option)
      return "correct-option";
    else if(question.userOption == option){
      return "wrong-option";
      
    }
    return "";
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  playAgain(){
    sessionStorage.removeItem('resultId');
    sessionStorage.setItem("quizCode", this.quiz.quizId);
    this.navigateTo('quiz');
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

  getBarColor(pos){
    if(this.accuracy >= 65)
    {
      if(pos == "outer")
        return "green-outer";
      return "green-inner";
    }
    if(this.accuracy >= 35)
    {
      if(pos == "outer")
        return "yellow-outer";
      return "yellow-inner";
    }
    else
    {
      if(pos == "outer")
        return "red-outer";
      return "red-inner";
    }
  }

  getDifficultyColor(difficulty){
    if(difficulty == "EASY")
      return "easy";
    else if(difficulty == "MED")
      return "med";
    return "hard";
  }

  async updateUser(){
    if(sessionStorage.getItem("ssid")){
      let user = JSON.parse(sessionStorage.getItem("ssid"));
      const addurl = "http://localhost:8080/regUser";
      let result : any = await this.http.post(addurl, user).toPromise()
      console.log(result)
      sessionStorage.setItem("ssid", JSON.stringify(result))   
     }
    else
      this.navigateTo('login')
  }

}
