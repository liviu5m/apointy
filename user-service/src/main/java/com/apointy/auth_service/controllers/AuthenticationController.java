package com.apointy.auth_service.controllers;

import com.apointy.auth_service.dtos.LoginUserDto;
import com.apointy.auth_service.dtos.RegisterUserDto;
import com.apointy.auth_service.models.User;
import com.apointy.auth_service.services.AuthenticationService;
import com.apointy.auth_service.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public ResponseEntity<?> getUser(){
        return ResponseEntity.ok("Hello World from Auth Service");
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        System.out.println(jwtToken);
        return ResponseEntity.ok("Successfully logged in");
    }
}