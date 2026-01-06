package com.apointy.auth_service.controllers;

import com.apointy.auth_service.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getUser(){
        return ResponseEntity.ok("Hello World from Auth Service");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserByEmail(@PathVariable Long id,@RequestHeader("X-User-Id") Long userId){
        return ResponseEntity.ok(userService.findById(id));
    }
}
