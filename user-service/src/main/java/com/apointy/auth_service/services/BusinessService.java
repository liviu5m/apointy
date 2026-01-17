package com.apointy.auth_service.services;

import com.apointy.auth_service.dtos.BusinessDto;
import com.apointy.auth_service.models.Business;
import com.apointy.auth_service.models.User;
import com.apointy.auth_service.repositories.BusinessRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {

    private final BusinessRepository businessRepository;

    public BusinessService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    public Business initiateBusiness(User user) {
        Business business = new Business();
        business.setUser(user);
        return businessRepository.save(business);
    }

    public Business getBusiness(Long userId) {
        System.out.println(userId);
        Business business = businessRepository.findByUserId(userId);
        return business;
    }

    public Business updateBusiness(BusinessDto businessDto, Long id) {
        Business business = businessRepository.findById(id).orElseThrow(() -> new RuntimeException("Business Not Found"));
        business.setName(businessDto.getName());
        business.setAddress(businessDto.getAddress());
        business.setCity(businessDto.getCity());
        business.setDescription(businessDto.getDescription());
        business.setImageUrl(businessDto.getImageUrl());
        return businessRepository.save(business);
    }

    public List<Business> getBusinessesBatch(List<Long> ids) {
        return businessRepository.findBusinessesByBatchIds(ids);
    }
}
