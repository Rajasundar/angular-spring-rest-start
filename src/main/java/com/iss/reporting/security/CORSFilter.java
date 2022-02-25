
package com.iss.reporting.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class CORSFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
    	
    	System.out.println("*********************Inide cors filter********************************"+request.getPathInfo());

        if ("OPTIONS".equals(request.getMethod())) {
            response.addHeader("Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS, HEAD");
            response.addHeader("Access-Control-Allow-Headers",
                    "origin, content-type, accept, authorization, X-AUTH-TOKEN");
            response.addHeader("Access-Control-Max-Age", "1800");
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.addHeader("Access-Control-Allow-Credentials", "true");
            response.addHeader("Access-Control-Expose-Headers",
                    "X-AUTH-TOKEN, Date");
            response.addHeader("Access-Control-Allow-Origin", "*");
            return;
        }
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE");
        response.addHeader("Access-Control-Allow-Headers",
                "origin, content-type, accept, authorization, X-AUTH-TOKEN");
        response.addHeader("Access-Control-Max-Age", "1800");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Expose-Headers",
                "X-AUTH-TOKEN, Date");

        filterChain.doFilter(request, response);
    }
}
