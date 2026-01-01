package com.apointy.auth_service.exceptions;

import lombok.Getter;

@Getter
public class UserDisabledException extends RuntimeException {
    private final Long userId;

    public UserDisabledException(String message, Long userId) {
        super(message);
        this.userId = userId;
    }

}