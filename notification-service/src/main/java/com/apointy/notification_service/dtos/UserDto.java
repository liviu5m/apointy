package com.apointy.notification_service.dtos;

import lombok.Getter;

@Getter
public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String role;

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
