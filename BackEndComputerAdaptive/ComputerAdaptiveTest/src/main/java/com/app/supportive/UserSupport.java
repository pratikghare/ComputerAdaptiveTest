package com.app.supportive;

public class UserSupport {
	String emailId;
	
	String status;
	
	String password;

	@Override
	public String toString() {
		return "UserSupport [emailId=" + emailId + ", status=" + status + ", password=" + password + ", userOTP="
				+ userOTP + "]";
	}

	String userOTP;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserOTP() {
		return userOTP;
	}

	public void setUserOTP(String userOTP) {
		this.userOTP = userOTP;
	}
	
	
}
