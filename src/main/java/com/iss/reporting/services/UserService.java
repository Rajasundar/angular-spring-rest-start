package com.iss.reporting.services;

import com.iss.reporting.dao.User;
import com.iss.reporting.repositories.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *A Class that represents all the User Services.
 *すべてのユーザーサービスを表すクラス。
 *
 * @author Raja
 *
 * @version 1.0
*/

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  /** Method to find Users.
   *  ユーザーを見つける方法。 */
  public List<User> findUsers() {
    return userRepository.findAll();
  }
}
