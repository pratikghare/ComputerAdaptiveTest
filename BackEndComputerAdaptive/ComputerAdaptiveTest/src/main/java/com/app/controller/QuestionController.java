package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.QuestionCRUD;
import com.app.dao.SubjectDomainCRUD;
import com.app.dto.Question;
import com.app.dto.SubjectDomains;

@RestController
@CrossOrigin
public class QuestionController {
	
	@Autowired
	QuestionCRUD quesCRUD;
	
	@Autowired
	SubjectDomainCRUD domainCRUD;
	

	@RequestMapping("/getAdaptiveQuiz")
	public List<Question> getQuizQuestionByDomain(@RequestParam int domainId){
		List <Question> quesList = quesCRUD.findByQuestionDomain(domainId);
		return quesList;
	}
	
	
}
