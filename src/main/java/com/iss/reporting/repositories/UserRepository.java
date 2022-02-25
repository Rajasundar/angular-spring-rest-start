package com.iss.reporting.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iss.reporting.dao.User;


public interface UserRepository extends JpaRepository<User, Long> {

  /** JPA Method used for selecting users.
  * ユーザーを選択するJPAメソッド。 */
  @Query(nativeQuery = true,value = "SELECT * "
      + " FROM USERS")
  List<User> findAll();
  
  /** JPA Method used for selecting users.
  * ユーザーを選択するJPAメソッド。 */
  User findByUsername(String userName);


}
