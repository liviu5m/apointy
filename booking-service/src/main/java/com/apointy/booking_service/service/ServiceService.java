package com.apointy.booking_service.service;

import com.apointy.booking_service.clients.UserClient;
import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.dtos.UserDto;
import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final UserClient userClient;

    public ServiceService(ServiceRepository serviceRepository, UserClient userClient) {
        this.serviceRepository = serviceRepository;
        this.userClient = userClient;
    }

    public Service createService(ServiceDto serviceDto, Long userId) {
        Service service = new Service(userId, serviceDto.getName(), ServiceDuration.valueOf(serviceDto.getDuration()), serviceDto.getPrice() , serviceDto.getCategory(), serviceDto.getDescription(), serviceDto.getAvailable());
        return serviceRepository.save(service);
    }

    public List<Service> getAllServiceByUserId(Long userId) {
        return serviceRepository.findAllByUserId(userId);
    }

    public Service updateService(ServiceDto serviceDto, Long serviceId) {
        Service service = serviceRepository.findById(serviceId).orElseThrow(() -> new RuntimeException("Service not found"));
        service.setName(serviceDto.getName());
        service.setDescription(serviceDto.getDescription());
        service.setPrice(serviceDto.getPrice());
        service.setCategory(serviceDto.getCategory());
        service.setAvailable(serviceDto.getAvailable());
        return serviceRepository.save(service);
    }

    public void deleteService(Long serviceId) {
        serviceRepository.deleteById(serviceId);
    }

    public UserDto getUserDetailsByEmail(Long id) {
        UserDto userDetails = userClient.getUserById(id);
        return userDetails;
    }
}
