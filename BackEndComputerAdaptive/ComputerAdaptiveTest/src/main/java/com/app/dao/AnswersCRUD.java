package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.dto.Answers;

@Repository
public interface AnswersCRUD extends JpaRepository<Answers, Integer>{
	
	@Query(value = "select answer_id from answers order by answer_id desc limit 1", nativeQuery = true)
	int getLastPrimaryKey();

	@Query(value = "select count(*) from answers", nativeQuery = true)
	int getCount();
}
