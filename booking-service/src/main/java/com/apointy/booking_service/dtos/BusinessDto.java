package com.apointy.booking_service.dtos;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class BusinessDto {

    private Long id;
    private String name;
    private String address;
    private String city;
    private String description;
    private String imageUrl;
    private UserDto user;

    @Override
    public String toString() {
        return "BusinessDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", user=" + user +
                '}';
    }
}
