import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { UserQuestion } from '../entity/user-question'

@Component({
  selector: 'app-host-quiz',
  templateUrl: './host-quiz.component.html',
  styleUrls: ['./host-quiz.component.css']
})
export class HostQuizComponent implements OnInit {

  constructor (private myRouter: Router, private http : HttpClient, private fb : FormBuilder) {
    
  }

  quiz = {
    quizTitle:"",
    quizDomain:{
      domainId:0,
      domain:""
    },
    quizDuration:1.0,
    questions:[]
  }
  
  isSelectedQues = false;

  questionsList:any;
  question:any;

  questionCount = 0;
  isError = false;
  errMsg:string;

  domainList:any;
  isAdded = false;

  isAllDone = false;

  public quizDetails = this.fb.group({
    quizTitle : ["", Validators.required],
    quizDuration : ["", Validators.required],
    quizDomain : ["" , Validators.required]
  })


  public questionDetails = this.fb.group({
    question: [{value : "", disabled : false}, Validators.required],
    option1: [{value : "", disabled : false}, Validators.required],
    option2: [{value : "", disabled : false}, Validators.required],
    difficulty: [{value : "", disabled : false}, Validators.required],
    option3: [{value : "", disabled : false}, []],
    option4: [{value : "", disabled : false}, []],
    correctOption : [{value : "", disabled : false}, Validators.required]
  })

  quizInfo = true;

  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    if(sessionStorage.getItem("ssid")){
      this.getDomains();
    }
    else{
      this.navigateTo('login')
    }
    
  }

  async getDomains(){
    let url = "http://localhost:8080/getAllDomains";
    this.domainList = await this.http.get(url).toPromise();
    console.log(this.domainList)
  }

  async getQuestions(){
    let domain = this.quiz.quizDomain.domainId;
    console.log(this.quiz)
    let url = "http://localhost:8080/getAdaptiveQuiz?domainId="+domain;
    console.log(url)
    this.questionsList = await this.http.get(url).toPromise();
    console.log(this.questionsList)
    this.getDomain();
  }

  getDomain(){
    for(let i=0; i<this.domainList.length; i++){
      if(this.quiz.quizDomain.domainId == this.domainList[i].domainId){
        //console.log(this.quiz.quizDomain.domainId + " " + this.domainList[i].domainId)
        this.quiz.quizDomain = this.domainList[i];
        break;
      }
    }
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  acceptQuizInfo(){
    console.log(this.quizDetails.value.quizTitle)
    this.quiz.quizTitle = this.quizDetails.value.quizTitle;
    //this.quiz.quizDomain = this.quizDomain;
    let duration = this.quizDetails.value.quizDuration
    console.log(duration)
    this.quiz.quizDomain.domainId = this.quizDetails.value.quizDomain
    this.quiz.quizDuration = duration;
    console.log(this.quiz)
    this.getQuestions();
    this.quizInfo = false;
  }


  setQuestion(qid){
    let i=0;
    for(i=0; i<this.questionsList.length; i++){
      if(this.questionsList[i].questionId == qid){
        return this.questionsList[i];
      }
    }
  }

  selectQuestion(eventEl){
    let question:any = this.setQuestion(eventEl.target.value)
    this.question = question;
    
    //console.log(question)
    if(eventEl.target.value == "-- Select a Question"){
      this.questionDetails.controls['question'].enable()
      this.questionDetails.controls['question'].setValue("")
      this.questionDetails.controls['option1'].enable()
      this.questionDetails.controls['option1'].setValue("")
      this.questionDetails.controls['option2'].enable()
      this.questionDetails.controls['option2'].setValue("")
      this.questionDetails.controls['option3'].enable()
      this.questionDetails.controls['option3'].setValue("")
      this.questionDetails.controls['option4'].enable()
      this.questionDetails.controls['option4'].setValue("")
      this.questionDetails.controls['correctOption'].enable()
      this.questionDetails.controls['correctOption'].setValue("")
      this.questionDetails.controls['difficulty'].enable()
      this.questionDetails.controls['difficulty'].setValue("")
      this.isSelectedQues = false;
    }
    else{
     //console.log(this.questionDetails.controls['question'])
     this.questionDetails.controls['question'].disable()
     this.questionDetails.controls['question'].setValue(question.question)
     this.questionDetails.controls['option1'].disable()
     this.questionDetails.controls['option1'].setValue(question.option1)
     this.questionDetails.controls['option2'].disable()
     this.questionDetails.controls['option2'].setValue(question.option2)
     this.questionDetails.controls['option3'].disable()
     this.questionDetails.controls['option3'].setValue(question.option3)
     this.questionDetails.controls['option4'].disable()
     this.questionDetails.controls['option4'].setValue(question.option4)
     this.questionDetails.controls['correctOption'].disable()
     this.questionDetails.controls['correctOption'].setValue(question.correctOption)
     this.questionDetails.controls['difficulty'].disable()
     this.questionDetails.controls['difficulty'].setValue(question.difficulty)
     this.isSelectedQues = true;
     //this.questionDetails.disabled = true;
    }
  }

  async createQuiz(){

    if(this.questionCount < 5){
      this.errMsg = "There should be atleast 5 questions in a Quiz";
      this.isError = true;
      return;
    }
    
    this.isAllDone = true;
    let user = JSON.parse(sessionStorage.getItem("ssid"));

    this.isError = false;
    console.log(this.quiz)
    let url = "http://localhost:8080/createQuiz"
    let quiz = await this.http.post(url, JSON.parse(JSON.stringify(this.quiz))).toPromise()
    user.hostedQuiz.push(quiz)
    console.log(user)
    url = "http://localhost:8080/regUser";
    user =  await this.http.post(url, user).toPromise();
    sessionStorage.removeItem("ssid");
    sessionStorage.setItem("ssid", JSON.stringify(user));
    setTimeout(()=>{this.navigateTo("/dashboard/hosted")}, 2000);
  }

  addQuestion(){
    if(this.questionDetails.value.option1 == this.questionDetails.value.option2 || this.questionDetails.value.option1 == this.questionDetails.value.option3 || this.questionDetails.value.option1 == this.questionDetails.value.option4
    || this.questionDetails.value.option2 == this.questionDetails.value.option3 || this.questionDetails.value.option2 == this.questionDetails.value.option4 ){
      this.errMsg = "Options cannot be Same!"
      this.isError = true;
      return;
    }
    else if((this.questionDetails.value.option3 == this.questionDetails.value.option4 && this.questionDetails.value.option3 == "") || this.questionDetails.value.option3 != this.questionDetails.value.option4)
    {
      this.isError = false;
    }  
    else{
      console.log("false")
      this.errMsg = "Options cannot be Same!";
      this.isError = true;
      return;
    }
      
    if(this.questionDetails.value.correctOption == this.questionDetails.value.option1 ||
      this.questionDetails.value.correctOption == this.questionDetails.value.option2 ||
      this.questionDetails.value.correctOption == this.questionDetails.value.option3 || 
      this.questionDetails.value.correctOption == this.questionDetails.value.option4
      ){
        console.log("true")
        if(this.questionCount > 40){
          this.errMsg = "You can insert upto 40 Questions in a Quiz!";
          this.isError = true;
          return;
        }
        this.questionCount++;
        this.isError = false;
        this.addQuestionToList();
    }
    else{
      this.errMsg = "Correct Option should be from one of the options given."
      this.isError = true;
    }
      
  }


  addQuestionToList(){
    if(this.isSelectedQues){
      console.log(this.question)
      this.quiz.questions.push(JSON.parse(JSON.stringify(this.question)))
    }
    else{
      let question = {
        question:"",
        difficulty:"",
        correctOption:"",
        domain:{},
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        status:0
      }
      question.question = this.questionDetails.value.question;
      question.option1 = this.questionDetails.value.option1;
      question.option2 = this.questionDetails.value.option2;
      question.option3 = this.questionDetails.value.option3;
      question.option4 = this.questionDetails.value.option4;
      question.difficulty = this.questionDetails.value.difficulty;
      question.correctOption = this.questionDetails.value.correctOption;
      question.domain = this.quiz.quizDomain;

      this.quiz.questions.push(question)
      console.log(question)

      
    }
    
    this.questionDetails.controls['question'].setValue("")
    this.questionDetails.controls['option1'].setValue("")
    this.questionDetails.controls['option2'].setValue("")
    this.questionDetails.controls['option3'].setValue("")
    this.questionDetails.controls['option4'].setValue("")
    this.questionDetails.controls['correctOption'].setValue("")
    this.questionDetails.controls['difficulty'].setValue("")
    this.isAdded = true;
    setTimeout(()=>{this.isAdded = false}, 2000)
  }

}
// question: [{value : "", disabled : false}, Validators.required],
// option1: [{value : "", disabled : false}, Validators.required],
// option2: [{value : "", disabled : false}, Validators.required],
// difficulty: [{value : "", disabled : false}, Validators.required],
// option3: [{value : "", disabled : false}, []],
// option4: [{value : "", disabled : false}, []],
// correctOption : [{value : "", disabled : false}, Validators.required]