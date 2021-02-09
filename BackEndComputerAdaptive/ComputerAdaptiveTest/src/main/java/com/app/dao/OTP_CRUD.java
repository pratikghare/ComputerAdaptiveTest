package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.*;

import com.app.dto.OTP;

@Repository
public interface OTP_CRUD extends JpaRepository<OTP, Integer>{
	@Query(value= "SELECT * FROM  otp  WHERE  otp = ? and emailid=?",nativeQuery = true)
	OTP findByOTPandEmailID(String OTP,String emailID);
}
