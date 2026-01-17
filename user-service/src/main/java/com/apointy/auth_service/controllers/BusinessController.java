package com.apointy.auth_service.controllers;

import com.apointy.auth_service.dtos.BusinessDto;
import com.apointy.auth_service.models.Business;
import com.apointy.auth_service.services.BusinessService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    private ResponseEntity<?> getBusiness(@RequestHeader("X-User-Id") Long userId) {
        Business business = businessService.getBusiness(userId);
        return ResponseEntity.ok(business);
    }

    @GetMapping("/user")
    private ResponseEntity<?> getBusinessByUserId(@RequestParam Long userId) {
        Business business = businessService.getBusiness(userId);
        return ResponseEntity.ok(business);
    }

    @GetMapping("/user-batch")
    public ResponseEntity<?> getBusinessesBatch(@RequestParam List<Long> ids){
        return ResponseEntity.ok(businessService.getBusinessesBatch(ids));
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> updateBusiness(@PathVariable Long id, @RequestBody BusinessDto businessDto) {
        Business business = businessService.updateBusiness(businessDto, id);
        return ResponseEntity.ok(business);
    }
}
