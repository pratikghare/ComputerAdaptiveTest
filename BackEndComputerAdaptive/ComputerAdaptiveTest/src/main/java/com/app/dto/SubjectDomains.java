package com.app.dto;

import javax.persistence.*;

@Entity
@Table
public class SubjectDomains {
	@Id
	private int domainId;
	
	private String domain;

	public int getDomainId() {
		return domainId;
	}

	public void setDomainId(int domainId) {
		this.domainId = domainId;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	@Override
	public String toString() {
		return "SubjectDomains [domainId=" + domainId + ", domain=" + domain + "]";
	}
	
	
}
