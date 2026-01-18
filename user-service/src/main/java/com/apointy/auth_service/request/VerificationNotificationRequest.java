package com.apointy.auth_service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationNotificationRequest {
    private String email;
    private String name;
    private String verificationCode;
}
