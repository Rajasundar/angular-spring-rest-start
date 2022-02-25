
package com.iss.reporting.security;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Date;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iss.reporting.dto.UserDTO;

public final class TokenHandler {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(TokenHandler.class);

    /* private static final long TEN_DAYS = (long) 1000 * 60 * 60 * 24 * 10; */
    public static final int FIFTEEN_MIN_MILLISECONDS = 15 * 60 * 1000;
    private static final String HMAC_ALGO = "HmacSHA256";
    private static final String SEPARATOR = ".";
    private static final String SEPARATOR_SPLITTER = "\\.";

    private final Mac hmac;

    public TokenHandler(byte[] secretKey) {
        try {
            hmac = Mac.getInstance(HMAC_ALGO);
            hmac.init(new SecretKeySpec(secretKey, HMAC_ALGO));
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            LOGGER.debug("Invalid key.", e);
            throw new IllegalStateException("failed to initialize HMAC: " + e.getMessage(), e);
        }
    }

    public UserDTO parseUserFromToken(final String token) {
        UserDTO userDTO = null;
        String copiedToken = token.replace("Bearer ", "");
        final String[] parts = copiedToken.split(SEPARATOR_SPLITTER);
        if (parts.length == 2 && parts[0].length() > 0 && parts[1].length() > 0) {
            try {
                final byte[] userBytes = fromBase64(parts[0]);
                final byte[] hash = fromBase64(parts[1]);
                boolean validHash = Arrays.equals(createHmac(userBytes), hash);
                userDTO = checkValidHash(userBytes, validHash);
            } catch (Exception e) {
                LOGGER.debug("Parse exception", e);
                return userDTO;
            }
        }
        return userDTO;
    }

    private UserDTO checkValidHash(final byte[] userBytes, boolean validHash) {
        UserDTO userDTO;
        if (validHash) {
            userDTO = fromJSON(userBytes);
            if (new Date().getTime() < userDTO.getExpires()) {
                return userDTO;
            }
        }
        return null;
    }

    public String createTokenForUser(com.iss.reporting.dao.User user) {
        
        UserDTO userDTO = new UserDTO.UserDTOBuilder(user).expires(System.currentTimeMillis() + FIFTEEN_MIN_MILLISECONDS).build();
        byte[] userBytes = toJSON(userDTO);
        byte[] hash = createHmac(userBytes);
        final StringBuilder sb = new StringBuilder(170);
        sb.append(toBase64(userBytes));
        sb.append(SEPARATOR);
        sb.append(toBase64(hash));
        return sb.toString();
    }

    private UserDTO fromJSON(final byte[] userBytes) {
        try {
            return new ObjectMapper().readValue(new ByteArrayInputStream(userBytes), UserDTO.class);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    private byte[] toJSON(UserDTO userDTO) {
        try {
            return new ObjectMapper().writeValueAsBytes(userDTO);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException(e);
        }
    }

    private String toBase64(byte[] content) {
        return DatatypeConverter.printBase64Binary(content);
    }

    private byte[] fromBase64(String content) {
        return DatatypeConverter.parseBase64Binary(content);
    }

    // synchronized to guard internal hmac object
    private synchronized byte[] createHmac(byte[] content) {
        return hmac.doFinal(content);
    }
}
