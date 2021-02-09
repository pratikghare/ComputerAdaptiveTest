package com.app.dto;


import java.util.List;

import javax.persistence.*;

import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Table(name = "Users")
public class User {
	@GeneratedValue
	private int userID;
	
	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	@Id
	private String emailID;
	@Column
	private String password;
	@Column
	private String firstName;
	@Column
	private String lastName;
	@Column
	private String contact;
	@Column
	private String gender;
	@Column
	private String profilePic;
	
	
	
	//private String profilepic;
	
	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	@OneToMany(targetEntity = Result.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "emailID", referencedColumnName = "emailID")
	private List<Result> quizResultList;

	@OneToMany(targetEntity = Quiz.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "host", referencedColumnName = "emailID")
	List<Quiz> hostedQuiz;
	
	private boolean isAdmin;

	private boolean status;

	public String getEmailID() {
		return emailID;
	}

	public void setEmailID(String emailID) {
		this.emailID = emailID;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<Result> getQuizResultList() {
		return quizResultList;
	}

	public void setQuizResultList(List<Result> quizResultList) {
		this.quizResultList = quizResultList;
	}

	public List<Quiz> getHostedQuiz() {
		return hostedQuiz;
	}

	public void setHostedQuiz(List<Quiz> hostedQuiz) {
		this.hostedQuiz = hostedQuiz;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "User [userID=" + userID + ", emailID=" + emailID + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", contact=" + contact + ", gender=" + gender + ", profilePic="
				+ profilePic + ", quizResultList=" + quizResultList + ", hostedQuiz=" + hostedQuiz + ", isAdmin="
				+ isAdmin + ", status=" + status + "]";
	}

	
	
	
	
}
