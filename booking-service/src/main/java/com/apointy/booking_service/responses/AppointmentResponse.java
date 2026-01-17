package com.apointy.booking_service.responses;

import com.apointy.booking_service.dtos.BusinessDto;
import com.apointy.booking_service.dtos.UserDto;
import com.apointy.booking_service.enums.AppointmentStatus;
import com.apointy.booking_service.models.Service;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
public class AppointmentResponse {
    private Long id;
    private Service service;
    private LocalDate date;
    private LocalTime time;
    private String notes;
    private AppointmentStatus status;
    private Date createdAt;
    private UserDto userDto;

    public AppointmentResponse(Long id, Service service, LocalDate date, LocalTime time, String notes, AppointmentStatus status, Date createdAt, UserDto userDto) {
        this.id = id;
        this.service = service;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.status = status;
        this.createdAt = createdAt;
        this.userDto = userDto;
    }
}
