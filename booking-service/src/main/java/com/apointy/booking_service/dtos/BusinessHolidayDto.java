package com.apointy.booking_service.dtos;

import com.apointy.booking_service.enums.BusinessHolidayType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class BusinessHolidayDto {
    private String reason;
    private BusinessHolidayType type;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate date;
    private String daysRecurring;
    private Long serviceId;
}
