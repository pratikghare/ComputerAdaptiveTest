package com.app.dto;

import java.util.List;

import javax.persistence.*;

@Entity
public class Result {
	

	@Id
	private int resultId;
	
	@ManyToOne
	@JoinColumn(name = "quizId")
	private Quiz quiz;
	
	private boolean isAdaptive;
	
	public boolean isAdaptive() {
		return isAdaptive;
	}


	public void setAdaptive(boolean isAdaptive) {
		this.isAdaptive = isAdaptive;
	}

	@ManyToMany
	@JoinTable(name="question_ans", joinColumns = @JoinColumn(name="resultId"), 
	inverseJoinColumns = @JoinColumn(name="answerId"))	
	List<Answers> answers;

	public int getResultId() {
		return resultId;
	}

	private int scoredMarks;
	
	private int totalMarks;
	
	public int getScoredMarks() {
		return scoredMarks;
	}


	public void setScoredMarks(int scoredMarks) {
		this.scoredMarks = scoredMarks;
	}


	public int getTotalMarks() {
		return totalMarks;
	}


	public void setTotalMarks(int totalMarks) {
		this.totalMarks = totalMarks;
	}


	public void setResultId(int resultId) {
		this.resultId = resultId;
	}


	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	public List<Answers> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answers> answers) {
		this.answers = answers;
	}


	
	
	
	
}
