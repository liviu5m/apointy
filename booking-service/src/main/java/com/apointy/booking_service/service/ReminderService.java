package com.apointy.booking_service.service;

import com.apointy.booking_service.enums.AppointmentStatus;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.repositories.AppointmentRepository;
import com.apointy.booking_service.request.AppointmentReminderRequest;
import com.apointy.booking_service.responses.AppointmentResponse;
import jakarta.transaction.Transactional;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReminderService {

    private final AppointmentRepository appointmentRepository;
    private final RabbitTemplate rabbitTemplate;

    public ReminderService(AppointmentRepository appointmentRepository, RabbitTemplate rabbitTemplate) {
        this.appointmentRepository = appointmentRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void sendReminders() {
        LocalTime windowStart = LocalTime.now();
        LocalTime windowEnd = LocalTime.now().plusMinutes(60);

        List<Appointment> toNotify = appointmentRepository.findAppointmentsNeedingReminder(
                LocalDate.now(), windowStart, windowEnd, AppointmentStatus.CONFIRMED
        );

        for (Appointment appt : toNotify) {
            try {
                AppointmentReminderRequest request = new AppointmentReminderRequest(appt.getUserId(), appt.getService().getName(), appt.getDate(), appt.getTime(), appt.getNotes());
                rabbitTemplate.convertAndSend("notificationExchange", "notification.sms.appointment.reminder", request);
                appt.setReminderSent(true);
                appointmentRepository.save(appt);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

}
