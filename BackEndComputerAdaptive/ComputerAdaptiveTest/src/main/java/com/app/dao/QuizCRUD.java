package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.Quiz;

@Repository
public interface QuizCRUD extends JpaRepository<Quiz, Integer> {
	@Query(value="select * from quiz where lower(quiz_domain) like %?%", nativeQuery = true)
	List<Quiz> findByQuizDomain(String quizDomain);
	
	
	@Query(value = "select quiz_id from quiz order by quiz_id desc limit 1", nativeQuery = true)
	int getLastPrimaryKey();
	
	@Modifying
	@Query(value ="update quiz set host = 'admin@quizzards' where host = ?", nativeQuery = true)
	@Transactional
	int setHostedQuizToAdmin(String emailID);
	
	
	
	@Query(value = "select count(*) from quiz", nativeQuery = true)
	int getCount();
	
	@Modifying
	@Query(value ="update quiz set host = 'admin@quizzards' where quiz_id = ?", nativeQuery = true)
	@Transactional
	int setHostedQuizToAdmin(int quizId);

}
