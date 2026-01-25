package com.apointy.notification_service.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentReminderRequest {
    private Long userId;
    private String serviceName;
    private LocalDate date;
    private LocalTime time;
    private String notes;
}
