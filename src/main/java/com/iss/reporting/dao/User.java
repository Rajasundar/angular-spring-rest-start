package com.iss.reporting.dao;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

/**
 *A class that represents User DAO.
 *ユーザーDAOを表�?�クラス。
 *
 * @author Raja
 *
 * @version 1.0
*/
@Entity
@Table(name = "USERS")
@Data
public class User implements UserDetails ,Serializable {

  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

@Id
  @Column(name = "ID")
  private Long id;
  
  @Column(name = "FIRST_NAME")
  private String firstName;

  @Column(name = "LAST_NAME")
  private String lastName;
  
  @Column(name = "USER_NAME")
  private String username;
  
  @Column(name = "PASSWORD")
  private String password;

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	
	return null;
}

@Override
public String getUsername() {
	return username;
}

@Override
public boolean isAccountNonExpired() {
	return true;
}

@Override
public boolean isAccountNonLocked() {
	
	return true;
}

@Override
public boolean isCredentialsNonExpired() {
	
	return true;
}

@Override
public boolean isEnabled() {
	return true;
}

}
