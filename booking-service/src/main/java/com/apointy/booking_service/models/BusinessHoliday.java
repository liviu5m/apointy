package com.apointy.booking_service.models;

import com.apointy.booking_service.enums.BusinessHolidayType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class BusinessHoliday {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    private String reason;
    @Enumerated(EnumType.STRING)
    private BusinessHolidayType type;

    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String daysRecurring;

    public BusinessHoliday(Service service, String reason, BusinessHolidayType type, LocalDate date, LocalTime startTime, LocalTime endTime, String daysRecurring) {
        this.service = service;
        this.reason = reason;
        this.type = type;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.daysRecurring = daysRecurring;
    }
}
