package com.apointy.booking_service.models;

import com.apointy.booking_service.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(length = 1000)
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status;

    private boolean reminderSent = false;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    public Appointment(Service service, Long userId, LocalDate date, LocalTime time, String notes, AppointmentStatus status) {
        this.service = service;
        this.userId = userId;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", service=" + service +
                ", userId=" + userId +
                ", date=" + date +
                ", time=" + time +
                ", notes='" + notes + '\'' +
                ", status=" + status +
                ", reminderSent=" + reminderSent +
                ", createdAt=" + createdAt +
                '}';
    }
}
