package com.apointy.booking_service.dtos;

import com.apointy.booking_service.enums.ServiceDuration;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ServiceDto {

    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Duration is required")
    private ServiceDuration duration;
    @NotNull(message = "Price is required")
    private Double price;
    @NotBlank(message = "Category is required")
    private String category;
    @NotBlank(message = "Description is required")
    private String description;
    private Boolean available;

}
