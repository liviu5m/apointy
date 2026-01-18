package com.apointy.booking_service.request;

import com.apointy.booking_service.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentNotificationUpdate {
    private Long userId;
    private AppointmentStatus status;
    private String serviceName;
    private LocalDate date;
}
