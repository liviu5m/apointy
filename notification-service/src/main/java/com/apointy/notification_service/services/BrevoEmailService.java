package com.apointy.notification_service.services;


import com.apointy.notification_service.clients.UserClient;
import com.apointy.notification_service.dtos.UserDto;
import com.apointy.notification_service.request.AppointmentNotificationUpdate;
import com.apointy.notification_service.request.AppointmentReminderRequest;
import com.apointy.notification_service.request.VerificationNotificationRequest;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Value("${brevo.url}")
    private String url;

    private final RestClient restClient;
    private final UserClient userClient;

    public BrevoEmailService(RestClient restClient, UserClient userClient) {
        this.restClient = restClient;
        this.userClient = userClient;
    }

    public void sendCreationEmailNotification(AppointmentNotificationUpdate request) {
        String pendingColor = "#ffc107";
        UserDto userDto = userClient.getUserById(request.getUserId());
        String htmlMessage = "<html>"
                + "<body style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0;\">"
                + "<div style=\"background-color: #f4f4f4; padding: 20px;\">"
                + "  <div style=\"max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);\">"
                + "    <div style=\"background-color: " + pendingColor + "; padding: 20px; text-align: center;\">"
                + "      <h1 style=\"color: #212529; margin: 0; font-size: 24px;\">Booking Received</h1>"
                + "    </div>"
                + "    <div style=\"padding: 30px;\">"
                + "      <p style=\"font-size: 18px;\">Hi <strong>" + userDto.getFullName() + "</strong>,</p>"
                + "      <p>Thank you for choosing Apointy! We've received your appointment request and it is currently <strong>pending review</strong>.</p>"
                + "      "
                + "      <div style=\"background-color: #fff3cd; border-left: 4px solid " + pendingColor + "; padding: 15px; margin: 20px 0; color: #856404;\">"
                + "        <strong>⏳ What happens next?</strong><br>"
                + "        Please wait while we verify the availability. You will receive another email once your appointment is confirmed by our team."
                + "      </div>"
                + ""
                + "      <div style=\"margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;\">"
                + "        <p style=\"margin: 5px 0;\"><strong>📅 Requested Date:</strong> " + request.getDate() + "</p>"
                + "        <p style=\"margin: 5px 0;\"><strong>🕒 Service:</strong> " + request.getServiceName() + "</p>"
                + "        <p style=\"margin: 5px 0;\"><strong>📌 Current Status:</strong> <span style=\"color: #856404; font-weight: bold;\">" + request.getStatus() + "</span></p>"
                + "      </div>"
                + "      "
                + "      <p style=\"margin-top: 30px; font-size: 14px; color: #666;\">No further action is needed from your side at this time. We'll be in touch shortly!</p>"
                + "    </div>"
                + "    <div style=\"background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;\">"
                + "      &copy; 2026 Apointy Booking System. All rights reserved."
                + "    </div>"
                + "  </div>"
                + "</div>"
                + "</body>"
                + "</html>";

        sendEmail(userDto.getEmail(), userDto.getFullName(), htmlMessage, "Booking Received & Pending - Apointy");
    }

    public void sendUpdateEmailNotification(AppointmentNotificationUpdate request) {
        String statusColor;
        switch (request.getStatus()) {
            case "CONFIRMED" -> statusColor = "#28a745";
            case "CANCELLED" -> statusColor = "#dc3545";
            case "COMPLETED" -> statusColor = "#007bff";
            default -> statusColor = "#ffc107";
        }

        UserDto userDto = userClient.getUserById(request.getUserId());

        String htmlMessage = "<html>"
                + "<body style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0;\">"
                + "<div style=\"background-color: #f4f4f4; padding: 20px;\">"
                + "  <div style=\"max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);\">"
                + "    <div style=\"background-color: " + statusColor + "; padding: 20px; text-align: center;\">"
                + "      <h1 style=\"color: white; margin: 0; font-size: 24px;\">Appointment Update</h1>"
                + "    </div>"
                + "    <div style=\"padding: 30px;\">"
                + "      <p style=\"font-size: 18px;\">Hi <strong>" + userDto.getFullName() + "</strong>,</p>"
                + "      <p>The status of your appointment has changed to:</p>"
                + "      <div style=\"display: inline-block; padding: 10px 20px; background-color: " + statusColor + "; color: white; border-radius: 50px; font-weight: bold; font-size: 16px; margin: 10px 0;\">"
                + "        " + request.getStatus() + ""
                + "      </div>"
                + "      <div style=\"margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;\">"
                + "        <p style=\"margin: 5px 0;\"><strong>📅 Date:</strong> " + request.getDate() + "</p>"
                + "        <p style=\"margin: 5px 0;\"><strong>🕒 Service:</strong> " + request.getServiceName() + "</p>"
                + "      </div>"
                + "      <p style=\"margin-top: 30px; font-size: 14px; color: #666;\">If you have any questions, please reply to this email.</p>"
                + "    </div>"
                + "    <div style=\"background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;\">"
                + "      &copy; 2026 Apointy Booking System. All rights reserved."
                + "    </div>"
                + "  </div>"
                + "</div>"
                + "</body>"
                + "</html>";
        sendEmail(userDto.getEmail(), userDto.getFullName(), htmlMessage, "Status Update Apointy !");
    }


    public void sendUserAccountEmailVerificationNotification(VerificationNotificationRequest request) {

        String verificationCode = "VERIFICATION CODE " + request.getVerificationCode();
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

        sendEmail(request.getEmail(), request.getName(), htmlMessage, "Welcome to Apointy !");
    }


    public void sendUserPasswordEmailVerificationNotification(VerificationNotificationRequest request) {

        String verificationCode = "VERIFICATION CODE " + request.getVerificationCode();
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

        sendEmail(request.getEmail(), request.getName(), htmlMessage, "Password Reset !");
    }

    public void sendAppointmentReminder(AppointmentReminderRequest request) {
        UserDto userDto = userClient.getUserById(request.getUserId());

        String htmlMessage =  "<html>"
                + "<body style=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #2d3748; margin: 0; padding: 0; background-color: #f7fafc;\">"
                + "  <div style=\"padding: 40px 10px;\">"
                + "    <div style=\"max-width: 500px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);\">"
                + "      "
                + "      "
                + "      <div style=\"background-color: #4c51bf; padding: 30px; text-align: center;\">"
                + "        <h2 style=\"color: #ffffff; margin: 0; font-size: 22px;\">See you in 30 minutes!</h2>"
                + "      </div>"
                + "      "
                + "      "
                + "      <div style=\"padding: 30px; text-align: center;\">"
                + "        <p style=\"font-size: 16px; color: #4a5568;\">Hi <strong>" + userDto.getFullName() + "</strong>,</p>"
                + "        <p style=\"font-size: 16px; color: #4a5568;\">Your <strong>" + request.getServiceName() + "</strong> is coming up soon. Please confirm you're still joining us!</p>"
                + "        "
                + "        "
                + "        <div style=\"margin: 25px 0; padding: 20px; background-color: #edf2f7; border-radius: 12px; text-align: left;\">"
                + "          <div style=\"margin-bottom: 10px;\"><strong>📅 Date:</strong> " + request.getDate() + "</div>"
                + "          <div style=\"margin-bottom: 10px;\"><strong>🕒 Time:</strong> " + request.getTime() + "</div>"
                + "          <div><strong>📝 Notes:</strong> " + (request.getNotes() != null ? request.getNotes() : "N/A") + "</div>"
                + "        </div>"
                + "        "
                + "        "
                + "        "
                + "        <p style=\"margin-top: 25px; font-size: 13px; color: #a0aec0;\">If you need to cancel, please call the business directly.</p>"
                + "      </div>"
                + "      "
                + "      "
                + "      <div style=\"background-color: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0;\">"
                + "        &copy; 2026 Apointy Local Service Manager"
                + "      </div>"
                + "    </div>"
                + "  </div>"
                + "</body>"
                + "</html>";
        sendEmail(userDto.getEmail(), userDto.getFullName(), htmlMessage, "Appointment Reminder !");
    }

    public void sendEmail(String email, String fullName, String body, String subject) {
        System.out.println("Sending email " + email);
        Map<String, Object> requestBody = Map.of(
                "sender", Map.of("name", "Apointy", "email", "motpanliviuwork@gmail.com"),
                "to", List.of(Map.of("email", email, "name", fullName)),
                "subject", subject,
                "htmlContent", body
        );

        try {
            restClient.post()
                    .uri(url)
                    .header("api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();
            System.out.println("Email sent successfully to: " + email);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

}