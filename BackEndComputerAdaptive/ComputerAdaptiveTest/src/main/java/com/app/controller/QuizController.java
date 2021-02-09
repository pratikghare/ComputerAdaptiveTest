package com.app.controller;

import java.io.Console;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.AnswersCRUD;
import com.app.dao.QuestionCRUD;
import com.app.dao.QuizCRUD;
import com.app.dao.ResultCRUD;
import com.app.dao.SubjectDomainCRUD;
import com.app.dto.Answers;
import com.app.dto.Question;
import com.app.dto.Quiz;
import com.app.dto.Result;
import com.app.dto.SubjectDomains;
import com.app.dto.User;


import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime; 


@RestController
@CrossOrigin
public class QuizController {
	
	@Autowired
	QuizCRUD quizCRUD;
	
	@Autowired
	QuestionCRUD quesCRUD;
	
	@Autowired
	SubjectDomainCRUD domainCRUD;
	
	@Autowired
	ResultCRUD resultCRUD;
	
	@Autowired
	AnswersCRUD ansCRUD;
	
	
	@PostMapping("/createQuiz")
	public Quiz createQuiz(@RequestBody Quiz quiz) {
		int lastQuiz=1,lastQue=1,lastDom=1;
		
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
		LocalDateTime now = LocalDateTime.now();  
		System.out.println(dtf.format(now)); 
		
		if(quizCRUD.getCount()>0)
			lastQuiz = quizCRUD.getLastPrimaryKey()+1;
		if(quesCRUD.getCount()>0)
			lastQue = quesCRUD.getLastPrimaryKey()+1;
		if(domainCRUD.getCount()>0)
			lastDom = domainCRUD.getLastPrimaryKey()+1;
		
		
		
		if(quiz.getQuizId() == 0) {
			quiz.setQuizId(lastQuiz);
			System.out.println("Quiz ID set to "+lastQuiz);
		}
		if(quiz.getQuizDomain().getDomainId() == 0) {
			quiz.getQuizDomain().setDomainId(lastDom);
			System.out.println("Domain ID set to "+lastDom);
		}
		domainCRUD.save(quiz.getQuizDomain());
		List<Question> questions = quiz.getQuestions();
		for (Question question : questions) {
			if(question.getQuestionId() == 0) {
				question.setQuestionId(lastQue++);
				System.out.println("Question ID set to "+(lastQue-1));
			}
			//System.out.println(System.currentTimeMillis());
			//quesCRUD.save(question);
		}
		//System.out.println(System.currentTimeMillis());
		quesCRUD.saveAll(questions);
		//System.out.println(System.currentTimeMillis());
		System.out.println(quiz);
		quesCRUD.setStatusToZero();
		quizCRUD.save(quiz);
		quizCRUD.setHostedQuizToAdmin(quiz.getQuizId());
		return quiz;
	}
	
	@RequestMapping("/delQuiz")
	public Quiz deleteQuiz(@RequestParam int quizId) {
		 
		
		Quiz quiz = new Quiz();
		quiz.setQuizId(quizId);
		List<Result> resultList = resultCRUD.getResultbyQuizID(quizId);
		if(!resultList.isEmpty()) {
			for(Result result : resultList) {
				List<Integer> ansIDList = resultCRUD.getAnswerIDs(result.getResultId());
				resultCRUD.delete(result);
				if(!ansIDList.isEmpty()) {
					for(Integer ansID : ansIDList) {
						Answers ans = new Answers();
						ans.setAnsId(ansID);
						ansCRUD.delete(ans);
					}
				}
			}
		}
		quiz.setQuizTitle("Deleted");
		quizCRUD.deleteById(quizId);
		return quiz;
	}
	
	/*
	@RequestMapping("/search")
	public List<Quiz> searchByQuizDomain(@RequestParam String quizDomain) {
		List<Quiz> quizList = quizCRUD.findByQuizDomain(quizDomain);
		
		return quizList;
	}
	*/
	
	@RequestMapping("/assignQuiz")
	public Quiz assignQuizToUser(@RequestParam int quizId, @RequestBody String reqEmails) {
		System.out.println(reqEmails);
		String temp = reqEmails.split("[")[1].split("]")[0];
		String []emails = temp.split(", ");
		for (String email : emails) {
			System.out.println(email);
			//aqCRUD.save(new AssignedQuiz(email, quizId));
		}
		//Optional<Quiz> quiz = (Quiz)quizCRUD.findById(quizId);
		//System.out.println(quiz);
		return new Quiz();
	}
	
	
	@RequestMapping("/searchbydomain")
	public List<Quiz> assignQuizToUser(@RequestParam String quizDomain) {
		quizDomain = quizDomain.toLowerCase();
		System.out.println(quizDomain);
		List<Quiz> quizList = quizCRUD.findByQuizDomain(quizDomain);
		quesCRUD.setStatusToZero();
		return quizList;
	}
	
	@RequestMapping("/getQuiz")
	public Optional<Quiz> getQuiz(@RequestParam int quizId) {
		Optional<Quiz> quiz = quizCRUD.findById(quizId);
		quesCRUD.setStatusToZero();
		return quiz;
	}
	
	@RequestMapping("/getDomains")
	public List<SubjectDomains> getDomains(@RequestParam String domain){
		List <SubjectDomains> domainList = domainCRUD.findbyDomain(domain.toLowerCase());
		return domainList;
	}
	
	@RequestMapping("/getDomainByID")
	public Optional<SubjectDomains> getDomainByID(@RequestParam int domainID){
		Optional<SubjectDomains> domain = domainCRUD.findById(domainID);
		return domain;
	}
	
	
	@RequestMapping("/getAllDomains")
	public List<SubjectDomains> getAllDomains(){
		List <SubjectDomains> domainList = domainCRUD.getDomains();
		return domainList;
	}
	

}
