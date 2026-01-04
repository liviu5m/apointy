package com.apointy.booking_service.models;

import com.apointy.booking_service.enums.ServiceDuration;
import jakarta.persistence.*;
import jdk.jfr.Category;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private ServiceDuration duration;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String category;

    @Column(length = 1000)
    private String description;

    private Boolean available;

    public Service(String name, ServiceDuration duration, Double price, String category, String description, Boolean available) {
        this.name = name;
        this.duration = duration;
        this.price = price;
        this.category = category;
        this.description = description;
        this.available = available;
    }

    public Service() {
    }

    @Override
    public String toString() {
        return "Service{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", duration=" + duration +
                ", price=" + price +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", available=" + available +
                '}';
    }
}
