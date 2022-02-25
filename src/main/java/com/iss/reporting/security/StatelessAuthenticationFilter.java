
package com.iss.reporting.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class StatelessAuthenticationFilter extends GenericFilterBean {

    private final TokenAuthenticationService tokenAuthenticationService;

    public StatelessAuthenticationFilter(TokenAuthenticationService taService) {
        this.tokenAuthenticationService = taService;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
            ServletException {
    	
    	System.out.println(((HttpServletRequest) req).getContextPath());
        SecurityContextHolder.getContext().setAuthentication(
                tokenAuthenticationService.getAuthentication((HttpServletRequest) req, (HttpServletResponse) res));
      //  SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(auth -> auth.getAuthority()).forEach(System.out::println);
       // System.out.println("isAuthenticated:" + SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
        chain.doFilter(req, res);
    }
}
