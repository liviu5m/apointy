package com.apointy.notification_service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentNotificationUpdate {
    private Long userId;
    private String status;
    private String serviceName;
    private LocalDate date;
}
