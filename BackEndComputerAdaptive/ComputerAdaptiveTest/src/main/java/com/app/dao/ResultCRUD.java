package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.dto.Result;

@Repository
public interface ResultCRUD extends JpaRepository<Result, Integer>{
	@Query(value = "select result_id from result order by result_id desc limit 1", nativeQuery = true)
	int getLastPrimaryKey();
	
	@Query(value = "select count(*) from result where is_adaptive = true and emailid = ?", nativeQuery = true)
	int getAdaptiveCount(String emailID);
	
	@Query(value = "select * from result where emailid = ? and quiz_id = ?", nativeQuery = true)
	Result getResultId(String emailID, int quizId);
	
	@Query(value = "select emailid from result where quiz_id = ? order by scored_marks desc", nativeQuery = true)
	List<String> getQuizPlayers(int quizId);
	
	@Query(value = "select * from result where quiz_id = ?", nativeQuery = true)
	List<Result> getResultbyQuizID(int quizId);

	@Query(value = "select * from result where emailid = ?", nativeQuery = true)
	List<Result> getResultbyEmail(String emailID);
	
	@Query(value = "select answer_id from question_ans where result_id = ?", nativeQuery = true)
	List<Integer> getAnswerIDs(int resultId);
	
	@Query(value = "select count(*) from result", nativeQuery = true)
	int getCount();
}
