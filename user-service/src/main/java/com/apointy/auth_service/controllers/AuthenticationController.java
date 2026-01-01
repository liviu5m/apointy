package com.apointy.auth_service.controllers;

import com.apointy.auth_service.dtos.*;
import com.apointy.auth_service.models.User;
import com.apointy.auth_service.services.AuthenticationService;
import com.apointy.auth_service.services.BrevoEmailService;
import com.apointy.auth_service.services.JwtService;
import com.apointy.auth_service.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final BrevoEmailService brevoEmailService;
    private final UserService userService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, BrevoEmailService brevoEmailService, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.brevoEmailService = brevoEmailService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getUser(){
        return ResponseEntity.ok("Hello World from Auth Service");
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        brevoEmailService.sendRegistrationEmail(registeredUser);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto, HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge((int) (jwtService.getExpirationTime() / 1000))
                .sameSite("None")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
        return ResponseEntity.ok("Successfully logged in");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/jwt")
    public ResponseEntity<?> verifyAuth(@CookieValue(value = "jwt", required = false) String token) {
        System.out.println(token);
        if (token != null && jwtService.isTokenValid(token)) {
            String username = jwtService.extractUsername(token);
            User user = userService.findByEmail(username);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.ok("Something went wrong.");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerifyDto verifyDto) {
        authenticationService.verifyAccount(verifyDto);
        return ResponseEntity.ok("Account verified");
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resend(@RequestBody ResendDto resendDto) {
        authenticationService.resendVerificationCode(resendDto);
        return ResponseEntity.ok("Verification code resent successfully");
    }

    @PostMapping("/password-email")
    public ResponseEntity<?> sendResetPasswordEmail(@RequestBody PasswordEmailDto passwordEmailDto) {
        authenticationService.sendResetPasswordEmail(passwordEmailDto);
        return ResponseEntity.ok("Reset password email sent successfully");
    }

    @PutMapping("/password-code")
    public ResponseEntity<?> checkPasswordVerificationCode(@RequestBody PasswordCodeDto passwordCodeDto) {
        authenticationService.checkPasswordVerificationCode(passwordCodeDto);
        return ResponseEntity.ok("Reset password email sent successfully");
    }

    @PutMapping("/password-code-resend")
    public ResponseEntity<?> resendPasswordVerificationCode(@RequestBody PasswordCodeResendDto passwordCodeResendDto) {
        authenticationService.resendPasswordVerificationCode(passwordCodeResendDto);
        return ResponseEntity.ok("Code resent successfully");
    }

    @PutMapping("/password-reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDto passwordResetDto) {
        authenticationService.resetPassword(passwordResetDto);
        return ResponseEntity.ok("Password reset successfully");
    }

}