package com.apointy.booking_service.service;

import com.apointy.booking_service.models.ServiceCategory;
import com.apointy.booking_service.repositories.ServiceCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceCategoryService {

    private final ServiceCategoryRepository serviceCategoryRepository;

    public ServiceCategoryService(ServiceCategoryRepository serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }

    public ServiceCategory getCategoryById(Long id) {
        return serviceCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public List<ServiceCategory> getAll() {
        return serviceCategoryRepository.findAll();
    }

}
