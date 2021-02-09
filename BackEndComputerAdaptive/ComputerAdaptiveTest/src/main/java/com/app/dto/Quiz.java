package com.app.dto;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class Quiz {
	@Id
	private int quizId;
	@Column
	private String quizTitle;
	@ManyToOne
	@JoinColumn(name = "domain_id")
	private SubjectDomains quizDomain;
	@Column
	private double quizDuration;
	
	/*
	@OneToMany(targetEntity = Result.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "quizId", referencedColumnName = "quizId")
	private List<Result> quizResultList;
	*/
	
	@ManyToMany 
	@JoinTable(name="Quiz_Questions", joinColumns = @JoinColumn(name="quizId"), 
	inverseJoinColumns = @JoinColumn(name="questionId"))
	private List<Question> questions = new ArrayList<Question>();

	public int getQuizId() {
		return quizId;
	}

	@Override
	public String toString() {
		return "Quiz [quizId=" + quizId + ", quizTitle=" + quizTitle + ", quizDomain=" + quizDomain + ", quizDuration="
				+ quizDuration + ", questions=" + questions + "]";
	}

	public void setQuizId(int quizId) {
		this.quizId = quizId;
	}

	public String getQuizTitle() {
		return quizTitle;
	}

	public void setQuizTitle(String quizTitle) {
		this.quizTitle = quizTitle;
	}

	public SubjectDomains getQuizDomain() {
		return quizDomain;
	}

	public void setQuizDomain(SubjectDomains quizDomain) {
		this.quizDomain = quizDomain;
	}

	public double getQuizDuration() {
		return quizDuration;
	}

	public void setQuizDuration(double quizDuration) {
		this.quizDuration = quizDuration;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
}
