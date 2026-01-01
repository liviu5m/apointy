package com.apointy.auth_service.dtos;

import lombok.Getter;

@Getter
public class ResendDto {
    private Long userId;

    public ResendDto(Long userId) {
        this.userId = userId;
    }
}
