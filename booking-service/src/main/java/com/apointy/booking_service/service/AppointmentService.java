package com.apointy.booking_service.service;

import com.apointy.booking_service.dtos.AppointmentDto;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.AppointmentRepository;

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
        Appointment appointment = new Appointment(service,userId, appointmentDto.getDate(), appointmentDto.getTime(), appointmentDto.getNotes());
        return appointmentRepository.save(appointment);
    }
}
