package com.apointy.auth_service.services;

import com.apointy.auth_service.models.Business;
import com.apointy.auth_service.models.User;
import com.apointy.auth_service.repositories.BusinessRepository;
import org.springframework.stereotype.Service;

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
        Business business = businessRepository.getBusinessByUserId(userId);
        return business;
    }
}
