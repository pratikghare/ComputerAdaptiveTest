package com.app.dto;

import java.util.List;
import java.util.ArrayList;

import javax.persistence.*;

@Entity
@Table
public class Question {
	@Id
	private int questionId;
	@Column(columnDefinition="text")
	private String question;
	@Column
	private String difficulty;
	@Column
	private String correctOption;
	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	@JoinColumn(name = "domain_id")
	private SubjectDomains domain;
	@Column
	private String option1;
	@Column
	private String option2;
	@Column
	private String option3;
	@Column
	private String option4;
	@Column
	private String option5;
	@Column(columnDefinition="int default '0'")
	private int status;
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
	public String getCorrectOption() {
		return correctOption;
	}
	public void setCorrectOption(String correctOption) {
		this.correctOption = correctOption;
	}
	public SubjectDomains getDomain() {
		return domain;
	}
	public void setDomain(SubjectDomains domain) {
		this.domain = domain;
	}
	public String getOption1() {
		return option1;
	}
	public void setOption1(String option1) {
		this.option1 = option1;
	}
	public String getOption2() {
		return option2;
	}
	public void setOption2(String option2) {
		this.option2 = option2;
	}
	public String getOption3() {
		return option3;
	}
	public void setOption3(String option3) {
		this.option3 = option3;
	}
	public String getOption4() {
		return option4;
	}
	public void setOption4(String option4) {
		this.option4 = option4;
	}
	public String getOption5() {
		return option5;
	}
	public void setOption5(String option5) {
		this.option5 = option5;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Question [questionId=" + questionId + ", question=" + question + ", difficulty=" + difficulty
				+ ", correctOption=" + correctOption + ", domain=" + domain + ", option1=" + option1 + ", option2="
				+ option2 + ", option3=" + option3 + ", option4=" + option4 + ", option5=" + option5 + ", status="
				+ status + "]";
	}
	

	
	
	
//	public List<Quiz> getQuizes() {
//		return quizes;
//	}
//
//	public void setQuizes(List<Quiz> quizes) {
//		this.quizes = quizes;
//	}

	//@ManyToMany(mappedBy = "questions")
	//private List<Quiz> quizes = new ArrayList<Quiz>();
	
}
