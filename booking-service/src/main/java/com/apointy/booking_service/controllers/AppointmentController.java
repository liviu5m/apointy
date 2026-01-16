package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.AppointmentDto;
import com.apointy.booking_service.dtos.AppointmentStatusDto;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<?> getAppointmentByUserId(@RequestHeader("X-User-Id") Long userId) {
        List<Appointment> appointments = appointmentService.findAppointmentsByUserId(userId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/service")
    public ResponseEntity<?> getAppointmentByOwnerId(@RequestHeader("X-User-Id") Long userId, @RequestParam String status) throws IOException, GeneralSecurityException {
        List<Appointment> appointments = appointmentService.getAppointmentByOwnerId(userId, status);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/available")
    public ResponseEntity<?> checkAvailabilityAppointment(@RequestParam Long serviceId, @RequestParam LocalDate date) {
        List<Appointment> appointments = appointmentService.findAppointmentsByServiceIdAndDate(serviceId, date);
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody AppointmentStatusDto appointmentStatusDto) throws IOException {
        Appointment appointment = appointmentService.updateAppointment(id, appointmentStatusDto);
        return ResponseEntity.ok(appointment);
    }
}
