package com.iss.reporting.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.iss.reporting.dao.User;
import com.iss.reporting.dto.ResponseDTO;
import com.iss.reporting.dto.TokenDTO;
import com.iss.reporting.dto.UserDTO;
import com.iss.reporting.repositories.UserRepository;

@Service
public class TokenAuthenticationService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TokenAuthenticationService.class);

    @Autowired
    private UserRepository userRepository;

    private static final String AUTH_HEADER_NAME = "Authorization";
    /* private static final long TEN_DAYS = (long) 1000 * 60 * 60 * 24 * 10; */

    private final TokenHandler tokenHandler;

    public TokenAuthenticationService() {
        tokenHandler = new TokenHandler(DatatypeConverter.parseBase64Binary("secret"));
    }

    public void addAuthentication(HttpServletResponse response, UserAuthentication authentication) {
        final UserDetails user = (UserDetails) authentication.getDetails();
        //user.setExpires(System.currentTimeMillis() + TEN_DAYS);
        response.addHeader(AUTH_HEADER_NAME, tokenHandler.createTokenForUser((User)user));
        ResponseDTO<TokenDTO> responseDTO = new ResponseDTO.ResponseDTOBuilder<TokenDTO>(true, null, new TokenDTO(tokenHandler.createTokenForUser((User)user))).build();

        response.setContentType("application/json");
        ObjectMapper mapper = new ObjectMapper();
        ObjectWriter writer = mapper.writerWithDefaultPrettyPrinter();

        try {
            response.getWriter().write(writer.writeValueAsString(responseDTO));
        } catch (IOException e) {
            LOGGER.debug("Bad credentiaals", e);
            throw new BadCredentialsException("Bad credentials");
        }
    }

    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) {
        final String token = request.getHeader(AUTH_HEADER_NAME);

        UserAuthentication userAuthentication;
        if (token != null) {
            final UserDTO userDTO = tokenHandler.parseUserFromToken(token);
            if (userDTO != null) {
                final User enabledUser = userRepository.findByUsername(userDTO.getUsername());
                System.out.println("enabled user: " + enabledUser.getFirstName());
                if (enabledUser != null) {
                    response.addHeader(AUTH_HEADER_NAME, token);
                    // Create Authentication object to be set in
                    // SecurityContextHolder
                    userAuthentication = new UserAuthentication(enabledUser);
                    System.out.println("userauthentication: " + userAuthentication.getName());

                    // TODO: Add code to save user activity, when required.

                    return userAuthentication;
                }
            }
        }
        return null;
    }
}
