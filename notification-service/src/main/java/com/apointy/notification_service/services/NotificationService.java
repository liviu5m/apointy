package com.apointy.notification_service.services;

import com.apointy.notification_service.configs.RabbitMQConfig;
import com.apointy.notification_service.request.AppointmentNotificationUpdate;
import com.apointy.notification_service.request.VerificationNotificationRequest;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final BrevoEmailService emailService;

    public NotificationService(BrevoEmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = "appointmentQueue")
    public void handleEmailAppointment(AppointmentNotificationUpdate request,@Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        System.out.println(routingKey);
        if(routingKey.equals(RabbitMQConfig.STATUS_UPDATE_RK)) emailService.sendUpdateEmailNotification(request);
        else if(routingKey.equals(RabbitMQConfig.APPOINTMENT_CREATED_RK)) emailService.sendCreationEmailNotification(request);
    }

    @RabbitListener(queues = "userQueue")
    public void handleEmailUser(VerificationNotificationRequest request, @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        System.out.println(routingKey);
        if(routingKey.equals(RabbitMQConfig.ACCOUNT_VERIFICATION_RK)) emailService.sendUserAccountEmailVerificationNotification(request);
        else if(routingKey.equals(RabbitMQConfig.PASSWORD_VERIFICATION_RK)) emailService.sendUserPasswordEmailVerificationNotification(request);
    }

}
