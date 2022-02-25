package com.iss.reporting.config;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.iss.reporting.security.StatelessAuthenticationFilter;
import com.iss.reporting.security.StatelessLoginFilter;
import com.iss.reporting.security.TokenAuthenticationService;
import com.iss.reporting.security.UserDetailsServiceImpl;



/**
 * Spring security configuration class.
 * 
 */
//@AutoConfigureAfter
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class RootSpringSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  @Autowired
  private TokenAuthenticationService tokenAuthenticationService;

  /*@Autowired
  private EntryPointUnauthorizedHandler unauthorizedHandler;*/

  RootSpringSecurityConfig() {
    super(true);
  }

  /**
   * Spring security configuration class.
   * 
   */
  @Bean
  public Filter characterEncodingFilter() {
    CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
    characterEncodingFilter.setEncoding("UTF-8");
    characterEncodingFilter.setForceEncoding(true);
    return characterEncodingFilter;
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
    httpSecurity.httpBasic().disable().authorizeRequests()
        .antMatchers("/app/home.html", ""
        		+ "/app/others.html") .permitAll().and()
        .addFilterBefore(new StatelessLoginFilter("/api/auth/sign-in", tokenAuthenticationService,
        userDetailsService, authenticationManager()), UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService),
        UsernamePasswordAuthenticationFilter.class);
    httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  
  @Override
  public void configure(WebSecurity webSecurity) throws Exception {
    webSecurity.ignoring().antMatchers("/h2");
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    /*BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();*/
    auth.userDetailsService(userDetailsService);
    auth.eraseCredentials(false);
  }
  
  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  
  @Override
  protected UserDetailsService userDetailsService() {
    return userDetailsService;
  }
  
}
