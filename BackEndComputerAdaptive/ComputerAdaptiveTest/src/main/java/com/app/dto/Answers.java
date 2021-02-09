package com.app.dto;

import javax.persistence.*;

@Entity
@Table
public class Answers {
	
	@Id
	private int answerId;
	 
	@ManyToOne(cascade = CascadeType.ALL, optional = false)
	@JoinColumn(name = "question_id")
	private Question question;
	
	private String userOption;

	

	public int getAnsId() {
		return answerId;
	}

	public void setAnsId(int answerId) {
		this.answerId = answerId;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public String getUserOption() {
		return userOption;
	}

	public void setUserOption(String userOption) {
		this.userOption = userOption;
	}

}
