package com.app.dto;

import javax.persistence.*;

@Entity
@Table
public class OTP {
	@Id
	@GeneratedValue
	int otpID;
	
	String OTP;

	String emailID;
	
	String time;

	public int getOtpID() {
		return otpID;
	}

	public void setOtpID(int otpID) {
		this.otpID = otpID;
	}

	public String getOTP() {
		return OTP;
	}

	@Override
	public String toString() {
		return "OTP [otpID=" + otpID + ", OTP=" + OTP + ", emailID=" + emailID + ", time=" + time + "]";
	}

	public void setOTP(String oTP) {
		OTP = oTP;
	}

	public String getEmailID() {
		return emailID;
	}

	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
	
	
}
