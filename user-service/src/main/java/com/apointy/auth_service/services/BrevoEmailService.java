package com.apointy.auth_service.services;


import com.apointy.auth_service.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class BrevoEmailService {

    @Value("${brevo.api-key}")
    private String apiKey;

    private final RestClient restClient;

    public BrevoEmailService(RestClient.Builder builder, @Value("${brevo.url}") String url) {
        this.restClient = builder.baseUrl(url).build();
    }

    public void sendResetPasswordEmail(User user) {
        String verificationCode = "VERIFICATION CODE " + user.getPasswordVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif; color: #333;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<div style=\"background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto;\">"
                + "<h2 style=\"color: #d9534f;\">Reset Your Password</h2>"
                + "<p style=\"font-size: 16px;\">We received a request to reset your password. Use the verification code below to complete the process:</p>"
                + "<div style=\"background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; text-align: center; margin: 20px 0;\">"
                + "<span style=\"font-size: 14px; color: #666; display: block; margin-bottom: 10px;\">Verification Code</span>"
                + "<span style=\"font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px;\">" + verificationCode + "</span>"
                + "</div>"
                + "<p style=\"font-size: 14px; color: #777;\">If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>"
                + "<hr style=\"border: none; border-top: 1px solid #eee; margin: 20px 0;\">"
                + "<p style=\"font-size: 12px; color: #999;\">This code will expire shortly for your security.</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of("name", "Apointy", "email", "motpanliviuwork@gmail.com"),
                "to", List.of(Map.of("email", user.getEmail(), "name", user.getFullName())),
                "subject", "Welcome to Apointy!",
                "htmlContent", htmlMessage
        );

        try {
            restClient.post()
                    .header("api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("Email sent successfully to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public void sendRegistrationEmail(User user) {
        System.out.println(user);
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of("name", "Apointy", "email", "motpanliviuwork@gmail.com"),
                "to", List.of(Map.of("email", user.getEmail(), "name", user.getFullName())),
                "subject", "Welcome to Apointy!",
                "htmlContent", htmlMessage
        );

        try {
            restClient.post()
                    .header("api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("Email sent successfully to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}