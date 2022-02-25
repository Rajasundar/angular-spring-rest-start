package com.iss.reporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 *Main class that starts the application.
 *アプリケーションを起動するメインクラス。
 *
 * @author Raja
 *
 * @version 1.0
*/

@SpringBootApplication
public class IssServiceApplication {

  /* Main method to load the application
  * アプリケーションをロードする主な方法  */
  public static void main(String[] args) {
    SpringApplication.run(IssServiceApplication.class, args);
  }
  
}
