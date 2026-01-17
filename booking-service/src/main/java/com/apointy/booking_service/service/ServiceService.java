package com.apointy.booking_service.service;

import com.apointy.booking_service.clients.UserClient;
import com.apointy.booking_service.dtos.BusinessDto;
import com.apointy.booking_service.dtos.PriceDto;
import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.dtos.UserDto;
import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.models.Appointment;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.models.ServiceCategory;
import com.apointy.booking_service.repositories.ServiceRepository;
import com.apointy.booking_service.responses.AppointmentResponse;
import com.apointy.booking_service.responses.ServiceResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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

    public Service getServiceById(Long id) {
        Service service = serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        return service;
    }

    public Page<ServiceResponse> getAllServices(String name, Long categoryId, ServiceDuration duration, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Service> servicePage = serviceRepository.findServicesWithFilters(name, categoryId, duration, minPrice, maxPrice, pageable);

        Set<Long> targetIds = servicePage.getContent().stream()
                .map(Service::getUserId)
                .collect(Collectors.toSet());

        List<BusinessDto> businesses = getBusinessBatch(targetIds);

        Map<Long, BusinessDto> businessMap = businesses.stream()
                .collect(Collectors.toMap(
                        business -> business.getUser().getId(),
                        business -> business
                ));

        return servicePage.map(service -> {
            BusinessDto businessDto = businessMap.get(service.getUserId());

            return new ServiceResponse(
                    service.getId(),
                    service.getName(),
                    service.getDuration(),
                    service.getPrice(),
                    service.getCategory(),
                    service.getDescription(),
                    service.getAvailable(),
                    service.getCreatedAt(),
                    businessDto
            );
        });
    }

    public Object[] getMaxMinPriceServices() {
        return serviceRepository.getPriceRange();
    }

    public Service createService(ServiceDto serviceDto, Long userId) {
        ServiceCategory category = serviceCategoryService.getCategoryById(serviceDto.getCategoryId());
        Service service = new Service(userId, serviceDto.getName(), ServiceDuration.valueOf(serviceDto.getDuration()), serviceDto.getPrice() , category, serviceDto.getDescription(), serviceDto.getAvailable());
        return serviceRepository.save(service);
    }

    public List<ServiceResponse> getAllServiceByUserId(Long userId) {
        return formatServices(serviceRepository.findAllByUserIdWithCategories(userId));
    }

    public List<ServiceResponse> formatServices(List<Service> services) {
        Set<Long> targetIds = services.stream()
                .map(Service::getUserId)
                .collect(Collectors.toSet());
        List<BusinessDto> businesses = getBusinessBatch(targetIds);
        for(BusinessDto data :  businesses) {
            System.out.println(data);
        }
        Map<Long, BusinessDto> businessMap = businesses.stream()
                .collect(Collectors.toMap(
                        business -> business.getUser().getId(),
                        business -> business
                ));
        System.out.println(businesses);
        return services.stream().map(service -> {
            BusinessDto businessDto = businessMap.get(service.getUserId());
            ServiceResponse response = new ServiceResponse(
                    service.getId(),
                    service.getName(),
                    service.getDuration(),
                    service.getPrice(),
                    service.getCategory(),
                    service.getDescription(),
                    service.getAvailable(),
                    service.getCreatedAt(),
                    businessDto
            );
            return response;
        }).toList();
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

    public BusinessDto getBusinessDetails(Long id) {
        BusinessDto businessDto = userClient.getBusinessByUserId(id);
        return businessDto;
    }

    public List<BusinessDto> getBusinessBatch(Set<Long> ids) {
        List<BusinessDto> businessDto = userClient.getBusinessBatch(ids);
        return businessDto;
    }
}
