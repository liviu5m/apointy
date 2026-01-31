package com.apointy.booking_service.models;

import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.repositories.ServiceRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceDuration duration;

    @Column(nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ServiceCategory category;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private Boolean available;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    public Service(Long userId, String name, ServiceDuration duration, Double price, ServiceCategory category, String description, Boolean available, LocalTime startTime, LocalTime endTime) {
        this.userId = userId;
        this.name = name;
        this.duration = duration;
        this.price = price;
        this.category = category;
        this.description = description;
        this.available = available;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Service() {
    }
}
