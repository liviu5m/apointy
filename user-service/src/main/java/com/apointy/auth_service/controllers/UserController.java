package com.apointy.auth_service.controllers;

import com.apointy.auth_service.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public ResponseEntity<?> getUserByEmail(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/batch")
    public ResponseEntity<?> getUsersBatch(@RequestParam List<Long> ids){
        return ResponseEntity.ok(userService.getUsersBatch(ids));
    }
}
