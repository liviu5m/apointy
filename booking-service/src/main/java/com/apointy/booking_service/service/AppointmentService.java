package com.apointy.booking_service.service;

import com.apointy.booking_service.clients.UserClient;
import com.apointy.booking_service.dtos.AppointmentDto;
import com.apointy.booking_service.dtos.AppointmentStatusDto;
import com.apointy.booking_service.dtos.BusinessDto;
import com.apointy.booking_service.dtos.UserDto;
import com.apointy.booking_service.enums.AppointmentStatus;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.AppointmentRepository;
import com.apointy.booking_service.responses.AppointmentResponse;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ServiceService serviceService;
    private final UserClient userClient;

    public AppointmentService(AppointmentRepository appointmentRepository, ServiceService serviceService, UserClient userClient) {
        this.appointmentRepository = appointmentRepository;
        this.serviceService = serviceService;
        this.userClient = userClient;
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

    public List<AppointmentResponse> getAppointmentByOwnerId(Long userId, String status) throws IOException, GeneralSecurityException {
        List<Appointment> appointments = appointmentRepository.getAppointmentByOwnerId(userId, status.equals("all") ? null : AppointmentStatus.valueOf(status.toUpperCase()));
        Set<Long> targetIds = appointments.stream()
                .map(Appointment::getUserId)
                .collect(Collectors.toSet());
        List<UserDto> users = getAllUserDetails(targetIds);
        Map<Long, UserDto> userMap = users.stream()
                .collect(Collectors.toMap(UserDto::getId, user -> user));
        return appointments.stream().map(appointment -> {
            UserDto user = userMap.get(appointment.getUserId());
            AppointmentResponse response = new AppointmentResponse(
                    appointment.getId(),
                    appointment.getService(),
                    appointment.getDate(),
                    appointment.getTime(),
                    appointment.getNotes(),
                    appointment.getStatus(),
                    appointment.getCreatedAt(),
                    user
            );
            return response;
        }).toList();
    }

    public List<Appointment> findAppointmentsByServiceIdAndDate(Long serviceId, LocalDate date) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsByServiceIdAndDate(serviceId, date);
        return appointments;
    }

    public Appointment updateAppointment(Long id, AppointmentStatusDto appointmentStatusDto) throws IOException {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(AppointmentStatus.valueOf(appointmentStatusDto.getStatus().toUpperCase()));
        return appointmentRepository.save(appointment);
    }

    public UserDto getUserDetails(Long userId) {
        UserDto userDto = userClient.getUserById(userId);
        return userDto;
    }

    public List<UserDto> getAllUserDetails(Set<Long> ids) {
        List<UserDto> users = userClient.getAllUsersById(ids);
        return users;
    }


}
