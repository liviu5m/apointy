package com.apointy.auth_service.dtos;

import lombok.Getter;

@Getter
public class PasswordResetDto {

    private String password;
    private String passwordConfirmation;
    private String email;
}
