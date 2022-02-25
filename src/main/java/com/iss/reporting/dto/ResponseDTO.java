package com.iss.reporting.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Generic data transfer object for sending unified responses for Rest calls.
 * 
 * @author Raj
 *
 * @param <T>
 */
public class ResponseDTO<T> {

    private Boolean success;
    private Message message;
    private T result;

    public ResponseDTO() {

    }

    private ResponseDTO(ResponseDTOBuilder<T> builder) {
        this.success = builder.success;
        this.message = builder.message;
        this.result = builder.result;
    }

    /**
     * 
     * @author Raj
     *
     * @param <T>
     */
    public static class ResponseDTOBuilder<T> {

        private Boolean success;
        private Message message;
        private T result;

        public ResponseDTOBuilder(Boolean success, Message message, T result) {
            this.success = success;
            this.message = message;
            this.result = result;
        }

        public ResponseDTOBuilder<T> success(Boolean success) {
            this.success = success;
            return this;
        }

        public ResponseDTOBuilder<T> message(Message message) {
            this.message = message;
            return this;
        }

        public ResponseDTOBuilder<T> result(T result) {
            this.result = result;
            return this;
        }

        public ResponseDTO<T> build() {
            return new ResponseDTO<T>(this);
        }
    }
    
    /**
     * 
     * @author Raj
     *
     */
    public static class Message {
        
        private String title;
        
        private String reason;
        
        public Message(String title, String reason) {
            this.title = title;
            this.reason = reason;
        }
        
        public String getTitle() {
            return title;
        }
        
        public void setTitle(String title) {
            this.title = title;
        }
        
        public String getReason() {
            return reason;
        }
        
        public void setReason(String reason) {
            this.reason = reason;
        }
    }

    public Message getMessage() {
        return message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public T getResult() {
        return result;
    }
    
    @Override
    public String toString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException(e);
        }
    }

}
