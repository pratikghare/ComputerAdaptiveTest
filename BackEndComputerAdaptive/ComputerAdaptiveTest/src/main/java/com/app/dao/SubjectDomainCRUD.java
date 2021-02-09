package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.dto.SubjectDomains;

@Repository
public interface SubjectDomainCRUD extends JpaRepository<SubjectDomains, Integer> {
	@Query(value="select * from subject_domains where lower(domain) like %?%", nativeQuery = true)
	List<SubjectDomains> findbyDomain(String domain);
	
	@Query(value = "select domain_id from subject_domains order by domain_id desc limit 1", nativeQuery = true)
	int getLastPrimaryKey();
	
	@Query(value = "select * from subject_domains order by domain", nativeQuery = true)
	List<SubjectDomains> getDomains();
	
	@Query(value = "select count(*) subject_domains", nativeQuery = true)
	int getCount();
}
