package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.Question;


@Repository
public interface QuestionCRUD extends JpaRepository<Question, Integer>{
	@Query(value="select * from question where domain_id = ?", nativeQuery = true)
	List<Question> findByQuestionDomain(int domainId);
	
	@Modifying
	@Query(value ="update question set status = 0", nativeQuery = true)
	@Transactional
	int setStatusToZero();
	
	@Query(value = "select question_id from question order by question_id desc limit 1", nativeQuery = true)
	int getLastPrimaryKey();
	
	@Query(value = "select count(*) from question", nativeQuery = true)
	int getCount();
}
