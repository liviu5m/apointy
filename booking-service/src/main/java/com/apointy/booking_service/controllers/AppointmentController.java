package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.AppointmentDto;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<?> addAppointment(@Valid @RequestBody AppointmentDto appointmentDto, @RequestHeader("X-User-Id") Long userId) {
        Appointment appointment = appointmentService.createAppointment(appointmentDto, userId);
        return ResponseEntity.ok(appointment);
    }
}
