package com.apointy.auth_service.dtos;

import lombok.Getter;

@Getter
public class PasswordCodeDto {
    private String email;
    private String code;
}
