package com.apointy.booking_service.service;

import com.apointy.booking_service.dtos.AppointmentDto;
import com.apointy.booking_service.dtos.AppointmentStatusDto;
import com.apointy.booking_service.enums.AppointmentStatus;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.AppointmentRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ServiceService serviceService;

    public AppointmentService(AppointmentRepository appointmentRepository, ServiceService serviceService) {
        this.appointmentRepository = appointmentRepository;
        this.serviceService = serviceService;
    }

    public Appointment createAppointment(AppointmentDto appointmentDto, Long userId) {
        Service service = serviceService.getServiceById(appointmentDto.getServiceId());
        Appointment appointment = new Appointment(service,userId, appointmentDto.getDate(), appointmentDto.getTime(), appointmentDto.getNotes(), AppointmentStatus.PENDING);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findAppointmentsByUserId(Long userId) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsByUserId(userId);
        return appointments;
    }

    public List<Appointment> getAppointmentByOwnerId(Long userId, String status) {
        List<Appointment> appointments = appointmentRepository.getAppointmentByOwnerId(userId, status.equals("all") ? null : AppointmentStatus.valueOf(status.toUpperCase()));
        return appointments;
    }

    public List<Appointment> findAppointmentsByServiceIdAndDate(Long serviceId, LocalDate date) {
        System.out.println(serviceId);
        System.out.println(date);
        List<Appointment> appointments = appointmentRepository.findAppointmentsByServiceIdAndDate(serviceId, date);
        return appointments;
    }

    public Appointment updateAppointment(Long id, AppointmentStatusDto appointmentStatusDto) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(AppointmentStatus.valueOf(appointmentStatusDto.getStatus().toUpperCase()));
        return appointmentRepository.save(appointment);
    }
}
