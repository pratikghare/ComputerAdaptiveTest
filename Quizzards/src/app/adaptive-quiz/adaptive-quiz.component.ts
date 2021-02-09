import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserQuestion } from '../entity/user-question';
import { FormBuilder, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-adaptive-quiz',
  templateUrl: './adaptive-quiz.component.html',
  styleUrls: ['./adaptive-quiz.component.css']
})
export class AdaptiveQuizComponent implements OnInit {
  quiz = {
    quizTitle : "AdaptiveQuiz",
    quizDomain : "",
    quizDuration : "1",
    hosted: "admin",
    questions : []
  }

  scoredMarks = 0;
  totalMarks = 0;

  quizResult = {
    quiz : {},
    answers : [],
    scoredMarks:0,
    totalMarks:0,
    adaptive:true
  }

  isSubmitClicked=false;

  answersList = [];

  quizResultList = [];

  answer = {
    question : {},
    userOption : ""
  }
  
  questionsList = "";
  questionCount=0;
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
    domain : "",
  }

  countR=0;
  countW=0;

  index = 0;
  isNext = true;
  constructor(private myRouter: Router, private http : HttpClient, private fb : FormBuilder) { }

  public fbFormGroup = this.fb.group({
    userOption:[]
  })
  domainName;
  ngOnInit(): void {
    sessionStorage.removeItem("hostCheck")
    sessionStorage.removeItem("resultId")
    
    if(sessionStorage.getItem("ssid")){
      this.getQuiz();
    }
    else{
      this.navigateTo("login")
    }
  }

  navigateTo(path){
    this.myRouter.navigate([path]);
  }

  async getQuiz(){
    if(!sessionStorage.getItem("domainId"))
      this.navigateTo("pnf")
    let domainId = sessionStorage.getItem("domainId");
    const url = "http://localhost:8080/getAdaptiveQuiz?domainId="+domainId;
    try {
      this.quizQuestions = await this.http.get(url).toPromise()
      console.log(this.quizQuestions)
      this.domainName = this.quizQuestions[0].domain.domain
      //console.log(this.quizQuestions[this.index])
      this.currQuestion = this.quizQuestions[this.index];
      this.quizQuestions[this.index++].status = 1;
      this.questionCount++;
    } catch (error) {
      this.navigateTo("pnf")
      
    }
    //this.quiz.question = [];
    
  }

  nextQuestion(userOption){
    //console.log("Prev Q")
    //console.log(this.currQuestion)
    this.currQuestion.userOption = userOption.target.innerText; //Setting the userOption
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
    
    this.storeQuestionDetails();
    console.log(this.index)
    console.log(this.quizQuestions.length)
    if((this.index < this.quizQuestions.length-1) && this.questionCount<20)
    {
      
      this.presentAdaptiveQuestion();
      this.questionCount++;
      //console.log(this.currQuestion)
      //Storing Question into QUIZ
    }
    else{
      this.isNext = false;
      //console.log("ELSE")
    }
  }

  storeQuestionDetails(){
    //console.log(this.currQuestion);
    this.questionsList = (JSON.stringify(this.currQuestion))
    let question = JSON.parse(this.questionsList)
    //console.log(question.userOption)
    //question.status = 0;
    this.answer.question = question;
    this.answer.userOption = question.userOption
    let ansStr = JSON.stringify(this.answer);
    //console.log(this.answer)
    this.answersList.push(JSON.parse(ansStr))

    this.quiz.questions.push(question)  //Storing the question in list

    console.log(this.answer)
    console.log(this.quiz)
    //console.log(this.quiz.questions)
    //console.log("moving to next question");
  }


  setUserObject(){
    let user = JSON.parse(sessionStorage.getItem("ssid"))
    console.log(user);
  }

  async submitQuiz()
  {/*
    this.quiz.quizDomain = this.currQuestion.domain;
    console.log(this.answersList)
    console.log(this.quiz)
    //Storing Answers and Quiz in a Result Object
    this.quizResult.answers = this.answersList;
    this.quizResult.quiz = this.quiz;
    let user = JSON.parse(sessionStorage.getItem("ssid"));
    user.quizResultList.push(this.quizResult)
    let len = user.quizResultList[0].answers.length
    let outerLen = user.quizResultList.length
    user.quizResultList.push(this.quizResult.quiz)


    
    //Setting Status to 0
    for(let i=0; i<outerLen; i++){
      for(let j=0; j<len; j++){
        user.quizResultList[i].answers[j].question.status = 0;
        user.quizResultList[i].quiz.questions[j].status = 0;
      }
    }
    */
    this.isSubmitClicked = true;
   this.quiz.quizDomain = this.currQuestion.domain;
   //console.log(this.answersList)
   //console.log(this.quiz)
   let user = JSON.parse(sessionStorage.getItem("ssid"));
   //console.log(JSON.stringify(user))
  // this.setUserObject();
   //this.navigateTo('')
  //  console.log(JSON.stringify(this.quiz))
  
    let url = "http://localhost:8080/getAdaptiveCount?emailID="+user.emailID;
    let count = await this.http.get(url).toPromise();
    
    this.quiz.quizTitle = "AdaptiveQuiz-"+count;
    url = "http://localhost:8080/createQuiz";
    let quiz= await this.http.post(url, this.quiz).toPromise();
    this.quizResult.quiz = quiz;
    this.quizResult.answers = this.answersList;
    this.quizResult.scoredMarks = this.scoredMarks;
    this.quizResult.totalMarks = this.totalMarks;
    this.quizResult.adaptive = true;

    user.quizResultList.push(this.quizResult)
    //console.log(JSON.stringify(user));
    url = "http://localhost:8080/regUser";
    let userStr = await this.http.post(url, user).toPromise();
    console.log(userStr)
    sessionStorage.removeItem("ssid");
    sessionStorage.setItem("ssid", JSON.stringify(userStr));
    //console.log(JSON.stringify(user))
   // this.setUserObject();
    //this.navigateTo('')
    sessionStorage.setItem("resultId", JSON.stringify(this.quizResult))
    this.navigateTo('result');
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


  presentAdaptiveQuestion(){
    //console.log("Inside Adaptive")
    //console.log(this.currQuestion.difficulty +" from adaptive" )
    if(this.currQuestion.userOption == this.currQuestion.correctOption){
      this.countW=0;//Making Wrong Counter 0
      if(this.countR > 1){
        this.countR=0; //Resetting Right Counter
        this.presentHardQuestion(this.currQuestion.difficulty);
      }
      else
       this.presentSameDifficulty(this.currQuestion.difficulty);

      console.log("CountRight="+this.countR+" CountWrong="+this.countW)

      this.countR++;
    }
    else{
      this.countR=0;//Making Right Counter 0
      if(this.countW > 1){
        this.countW=0; //Resetting Wrong Counter
        
        this.presentEasyQuestion(this.currQuestion.difficulty);
      }
      else
       this.presentSameDifficulty(this.currQuestion.difficulty);

       console.log("CountRight="+this.countR+" CountWrong="+this.countW)
      this.countW++;
    }
  }

  presentHardQuestion(currDifficulty){
    //console.log("Inside Hard")
    
    //console.log(this.currQuestion.difficulty +" from hard "+ currDifficulty )
    /*
    let temp = 0;
    if(temp < this.questionsList.length - 2)
      temp = this.index;
    let flag = true;
    */
    if(currDifficulty == "EASY"){
      currDifficulty = "MED";
    }
    else if(currDifficulty == "MED"){
      currDifficulty = "HARD";
    }
    else
      currDifficulty = "HARD";
    //console.log(currDifficulty)
    let assigned = false;
    for(let i = this.index; i<this.quizQuestions.length-1; i++){
      /*
      if(i == this.questionsList.length-2 && temp != 0 && flag){
        i = 0;  //To iterate the questionsList when if i is almost at the end
        flag = false; // To make sure iteration happens only once
      }
      */
      if(this.quizQuestions[i].status == 0 && this.quizQuestions[i].difficulty == currDifficulty)
      {
        assigned=true;
        this.setCurrQuestion(this.quizQuestions[i]);
        this.quizQuestions[i].status = 1;
        console.log("Hard Question Displayed with difficulty"+currDifficulty);
        break;
      }
    }
    if(!assigned){
      console.log("Jumping to Normal From hard")
      this.presentSameDifficulty(currDifficulty)
    }
  }

  presentNormalQuestion(currDifficulty){
    //console.log("Inside Normal")

    let flag = true;
    while(flag){
      if(this.quizQuestions[this.index].status == 0){
        this.setCurrQuestion(this.quizQuestions[this.index]);
        this.quizQuestions[this.index].status = 1;
        flag = false;
        console.log("Normal Question Displayed with difficulty "+currDifficulty);
      }
      this.index++;
    }
  }

  presentEasyQuestion(currDifficulty){
    //console.log(this.currQuestion.difficulty +" from easy "+ currDifficulty )
    //console.log("Inside Easy")
    if(currDifficulty == "EASY"){
      currDifficulty = "EASY";
    }
    else if(currDifficulty == "MED"){
      currDifficulty = "EASY";
    }
    else
      currDifficulty = "MED";
      //console.log(currDifficulty)
    let assigned = false;
    for(let i = this.index; i<this.quizQuestions.length-1; i++){
      /*
      if(i == this.questionsList.length-2 && temp != 0 && flag){
        i = 0;  //To iterate the questionsList when if i is almost at the end
        flag = false; // To make sure iteration happens only once
      }
      */
      if(this.quizQuestions[i].status == 0 && this.quizQuestions[i].difficulty == currDifficulty)
      {
        assigned=true;
        this.setCurrQuestion(this.quizQuestions[i]);
        this.quizQuestions[i].status = 1;
        console.log("Easy Question Displayed with difficulty "+currDifficulty);
        break;
      }
    }
    if(!assigned){
      console.log("Jumping to Normal From easy")

      this.presentSameDifficulty(currDifficulty)
    }
  }

  presentSameDifficulty(currDifficulty){
    //console.log("Inside Same")
    //console.log(this.currQuestion.difficulty +" from same "+ currDifficulty )
    let assigned = false;
    let i = this.index;
    //console.log(this.quizQuestions[i].status)
    //console.log(this.quizQuestions[i])
     
    while(i<this.quizQuestions.length-1){
      
      if(this.quizQuestions[i].status){
        //console.log("i="+ i + " status=" + this.quizQuestions[i].status)
        i++;
        continue;
      }
      //console.log(currDifficulty + " " + this.quizQuestions[i].difficulty + " qid = "+this.quizQuestions[i].questionId)
      //console.log(this.quizQuestions[i].difficulty == currDifficulty)
      if(this.quizQuestions[i].difficulty == currDifficulty){
        this.setCurrQuestion(this.quizQuestions[i]);
        this.quizQuestions[i].status = 1;
        console.log("Same Diff Question Displayed with difficulty "+currDifficulty);
        assigned = true;
        break;
      }
      //console.log("i="+ i)
        i++;
    }
    if(!assigned){
      this.presentNormalQuestion(currDifficulty);
    }
  }

}
