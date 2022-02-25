package com.iss.reporting.security;

import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

public class LogoutFilter extends org.springframework.security.web.authentication.logout.LogoutFilter {

	public LogoutFilter(LogoutSuccessHandler logoutSuccessHandler, LogoutHandler[] handlers) {
		super(logoutSuccessHandler, handlers);
		// TODO Auto-generated constructor stub
	}

}
