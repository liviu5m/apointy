package com.apointy.booking_service.service;

import com.apointy.booking_service.clients.UserClient;
import com.apointy.booking_service.dtos.PriceDto;
import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.dtos.UserDto;
import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.models.ServiceCategory;
import com.apointy.booking_service.repositories.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final ServiceCategoryService serviceCategoryService;
    private final UserClient userClient;

    public ServiceService(ServiceRepository serviceRepository, ServiceCategoryService serviceCategoryService, UserClient userClient) {
        this.serviceRepository = serviceRepository;
        this.serviceCategoryService = serviceCategoryService;
        this.userClient = userClient;
    }

    public Page<Service> getAllServices(String name, Long categoryId, ServiceDuration duration, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return serviceRepository.findServicesWithFilters(name, categoryId, duration, minPrice, maxPrice, pageable);
    }

    public Object[] getMaxMinPriceServices() {
        return serviceRepository.getPriceRange();
    }

    public Service createService(ServiceDto serviceDto, Long userId) {
        ServiceCategory category = serviceCategoryService.getCategoryById(serviceDto.getCategoryId());
        Service service = new Service(userId, serviceDto.getName(), ServiceDuration.valueOf(serviceDto.getDuration()), serviceDto.getPrice() , category, serviceDto.getDescription(), serviceDto.getAvailable());
        return serviceRepository.save(service);
    }

    public List<Service> getAllServiceByUserId(Long userId) {
        return serviceRepository.findAllByUserIdWithCategories(userId);
    }

    public Service updateService(ServiceDto serviceDto, Long serviceId) {
        ServiceCategory category = serviceCategoryService.getCategoryById(serviceDto.getCategoryId());
        Service service = serviceRepository.findById(serviceId).orElseThrow(() -> new RuntimeException("Service not found"));
        service.setName(serviceDto.getName());
        service.setDescription(serviceDto.getDescription());
        service.setPrice(serviceDto.getPrice());
        service.setCategory(category);
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
