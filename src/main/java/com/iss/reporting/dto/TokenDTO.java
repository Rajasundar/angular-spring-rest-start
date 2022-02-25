package com.iss.reporting.dto;

/**
 * Data transfer object for Login. Primariy used for user authentication/login.
 * @author Raj
 *
 */
public class TokenDTO {

    private String token;

    public TokenDTO(String token){ 
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
}
