package com.apointy.booking_service.dtos;

import com.apointy.booking_service.enums.BusinessHolidayType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class BusinessHolidayDto {
    @NotBlank(message = "Reason is required")
    private String reason;
    @NotNull(message = "Type is required")
    private BusinessHolidayType type;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    private String daysRecurring;
    private Long serviceId;
}
