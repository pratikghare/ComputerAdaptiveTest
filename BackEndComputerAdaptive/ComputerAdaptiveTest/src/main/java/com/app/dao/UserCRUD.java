package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.dto.User;

@Repository
public interface UserCRUD extends JpaRepository<User, String>{
	User findByEmailIDAndPassword(String emailID, String password);

	
	User findByEmailID(String emailID);
}
