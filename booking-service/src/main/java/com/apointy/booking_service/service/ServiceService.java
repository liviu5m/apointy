package com.apointy.booking_service.service;

import com.apointy.booking_service.clients.UserClient;
import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.dtos.UserDto;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.ServiceRepository;
import org.springframework.web.bind.annotation.RequestBody;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final UserClient userClient;

    public ServiceService(ServiceRepository serviceRepository, UserClient userClient) {
        this.serviceRepository = serviceRepository;
        this.userClient = userClient;
    }

    public Service createService(ServiceDto serviceDto, Long userId) {
        Service service = new Service(userId, serviceDto.getName(), serviceDto.getDuration(), serviceDto.getPrice() , serviceDto.getCategory(), serviceDto.getDescription(), serviceDto.getAvailable());
        System.out.println(getUserDetailsByEmail(userId));
        return serviceRepository.save(service);
    }

    public UserDto getUserDetailsByEmail(Long id) {
        System.out.println("Bro I am here" + id);
        UserDto userDetails = userClient.getUserById(id);
        return userDetails;
    }
}
