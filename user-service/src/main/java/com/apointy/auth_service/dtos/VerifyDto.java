package com.apointy.auth_service.dtos;

import lombok.Getter;

@Getter
public class VerifyDto {
    private String verificationCode;
    private Long userId;
}
