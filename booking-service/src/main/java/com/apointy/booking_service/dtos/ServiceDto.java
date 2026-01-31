package com.apointy.booking_service.dtos;

import com.apointy.booking_service.enums.ServiceDuration;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalTime;

@Getter
public class ServiceDto {

    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Duration is required")
    private String duration;
    @NotNull(message = "Price is required")
    private Double price;
    @NotNull(message = "Category is required")
    private Long categoryId;
    @NotBlank(message = "Description is required")
    private String description;
    @NotNull(message = "Start time is required")
    private LocalTime startTime;
    @NotNull(message = "End time is required")
    private LocalTime endTime;
    private Boolean available;

}
