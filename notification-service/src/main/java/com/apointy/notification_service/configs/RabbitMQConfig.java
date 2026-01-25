package com.apointy.notification_service.configs;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String STATUS_UPDATE_RK = "notification.email.updated";
    public static final String APPOINTMENT_CREATED_RK = "notification.email.created";
    public static final String ACCOUNT_VERIFICATION_RK = "notification.email.user.account-verification";
    public static final String PASSWORD_VERIFICATION_RK = "notification.email.user.password-verification";
    public static final String APPOINTMENT_REMINDER_RK = "notification.sms.appointment.reminder";

    @Bean
    public Jackson2JsonMessageConverter jsonConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // --- QUEUES ---
    @Bean public Queue appointmentQueue() { return new Queue("appointmentQueue"); }
    @Bean public Queue userQueue() { return new Queue("userQueue"); }
    @Bean public Queue reminderQueue() { return new Queue("reminderQueue"); }

    // --- EXCHANGE ---
    @Bean public TopicExchange exchange() { return new TopicExchange("notificationExchange"); }

    // --- BINDINGS (The Routing Logic) ---

    @Bean
    public Binding emailBindingAppointment(Queue appointmentQueue, TopicExchange exchange) {
        return BindingBuilder.bind(appointmentQueue).to(exchange).with("notification.email.appointment.#");
    }

    @Bean
    public Binding emailBindingUser(Queue userQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userQueue).to(exchange).with("notification.email.user.#");
    }

    @Bean
    public Binding appointmentReminder(Queue reminderQueue, TopicExchange exchange) {
        return BindingBuilder.bind(reminderQueue).to(exchange).with("notification.sms.appointment.#");
    }

}