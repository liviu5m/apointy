package com.apointy.auth_service.dtos;

import lombok.Getter;

@Getter
public class GoogleSyncDto {
    private String token;
    private String role;
}
