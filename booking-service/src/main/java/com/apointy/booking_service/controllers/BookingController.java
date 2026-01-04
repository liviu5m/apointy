package com.apointy.booking_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class BookingController {

    @GetMapping
    public ResponseEntity<?> getBooking(){
        return ResponseEntity.ok("Hello World Bookign Service");
    }
}
