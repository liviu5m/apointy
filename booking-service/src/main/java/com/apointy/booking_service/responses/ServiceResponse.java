package com.apointy.booking_service.responses;

import com.apointy.booking_service.dtos.BusinessDto;
import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.models.ServiceCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ServiceResponse {

    private Long id;
    private String name;
    private ServiceDuration duration;
    private Double price;
    private ServiceCategory category;
    private String description;
    private Boolean available;
    private Date createdAt;
    private BusinessDto businessDto;

    public ServiceResponse(Long id, String name, ServiceDuration duration, Double price, ServiceCategory category, String description, Boolean available, Date createdAt, BusinessDto businessDto) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.price = price;
        this.category = category;
        this.description = description;
        this.available = available;
        this.createdAt = createdAt;
        this.businessDto = businessDto;
    }
}
