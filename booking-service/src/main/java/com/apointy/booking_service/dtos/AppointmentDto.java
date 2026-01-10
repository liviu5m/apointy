package com.apointy.booking_service.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
public class AppointmentDto {

    @NotNull(message = "Service is required")
    private Long serviceId;
    @NotNull(message = "Date is required")
    private LocalDate date;
    @NotNull(message = "Time is required")
    private LocalTime time;
    private String notes;

}
