package com.apointy.booking_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/service")
public class ServiceController {

    @GetMapping
    public ResponseEntity<?> getService(@RequestHeader("X-User-Email") String userEmail){
        return ResponseEntity.ok("That's good" + userEmail);
    }

}
