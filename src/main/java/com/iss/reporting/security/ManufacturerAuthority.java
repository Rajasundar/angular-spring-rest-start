package com.iss.reporting.security;

import org.springframework.security.core.GrantedAuthority;

/**
 * User Authority domain model object.
 * 
 * 
 */
public class ManufacturerAuthority implements GrantedAuthority{
    
    private static final long serialVersionUID = 1438263126141390777L;

    private String authority;

    public ManufacturerAuthority(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

}
