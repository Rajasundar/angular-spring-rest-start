package com.iss.reporting.security;

import com.iss.reporting.dao.User;
import com.iss.reporting.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



//@Service("userDetailsService")
//@Transactional
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;
    
  private final AccountStatusUserDetailsChecker detailsChecker
      = new AccountStatusUserDetailsChecker();

  @Override
  public UserDetails loadUserByUsername(String username) {
    final User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("user not found");
    }
    detailsChecker.check((UserDetails) user);
    return (UserDetails) user;
  }
}
