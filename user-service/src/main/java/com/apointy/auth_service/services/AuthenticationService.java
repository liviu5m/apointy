package com.apointy.auth_service.services;

import com.apointy.auth_service.dtos.*;
import com.apointy.auth_service.enums.UserRole;
import com.apointy.auth_service.exceptions.UserDisabledException;
import com.apointy.auth_service.models.User;
import com.apointy.auth_service.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Random random =  new Random();
    private final BrevoEmailService brevoEmailService;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, BrevoEmailService brevoEmailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.brevoEmailService = brevoEmailService;
    }

    public User signup(RegisterUserDto input) {
        if(!input.getPassword().equals(input.getPasswordConfirmation())) throw new RuntimeException("Passwords don't match");
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()) throw new RuntimeException("User already exists");
        User user = new User(input.getFullName(), input.getEmail(), passwordEncoder.encode(input.getPassword()), UserRole.valueOf(input.getRole().toUpperCase()));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail()).orElseThrow(() -> new RuntimeException("Bad credentials"));
        if(!user.isEnabled()) {
            resendVerificationCode(new ResendDto(user.getId()));
            throw new UserDisabledException("User is disabled", user.getId());
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }

    public void verifyAccount(VerifyDto verifyDto) {
        User user = userRepository.findById(verifyDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!LocalDateTime.now().isBefore(user.getVerificationCodeExpiresAt())) throw new RuntimeException("Verification code has expired");
        if(!user.getVerificationCode().equals(verifyDto.getVerificationCode())) throw new RuntimeException("Codes do not match");
        user.setEnabled(true);
        user.setVerificationCodeExpiresAt(null);
        user.setVerificationCode(null);
        userRepository.save(user);
    }

    public void resendVerificationCode(ResendDto resendDto) {
        User user = userRepository.findById(resendDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        brevoEmailService.sendRegistrationEmail(user);
        userRepository.save(user);
    }

    public void sendResetPasswordEmail(PasswordEmailDto passwordEmailDto) {
        User user = userRepository.findByEmail(passwordEmailDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPasswordVerificationCode(generateVerificationCode());
        user.setPasswordVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        brevoEmailService.sendResetPasswordEmail(user);
        userRepository.save(user);
    }

    public void checkPasswordVerificationCode(PasswordCodeDto passwordCodeDto) {
        User user = userRepository.findByEmail(passwordCodeDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!LocalDateTime.now().isBefore(user.getPasswordVerificationCodeExpiresAt())) throw new RuntimeException("Password verification code has expired");
        if(!user.getPasswordVerificationCode().equals(passwordCodeDto.getCode())) throw new RuntimeException("Password verification code does not match");
        user.setPasswordVerificationCode(null);
        user.setPasswordVerificationCodeExpiresAt(null);
        user.setPasswordValidation(true);
        userRepository.save(user);
    }

    public void resendPasswordVerificationCode(PasswordCodeResendDto passwordCodeResendDto) {
        User user = userRepository.findByEmail(passwordCodeResendDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPasswordVerificationCode(generateVerificationCode());
        user.setPasswordVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        brevoEmailService.sendResetPasswordEmail(user);
        userRepository.save(user);
    }

    public void resetPassword(PasswordResetDto passwordResetDto) {
        if(!passwordResetDto.getPassword().equals(passwordResetDto.getPasswordConfirmation())) throw new RuntimeException("Passwords don't match");
        User user = userRepository.findByEmail(passwordResetDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!user.isPasswordValidation()) throw new RuntimeException("Password validation failed");
        user.setPassword(passwordEncoder.encode(passwordResetDto.getPassword()));
        userRepository.save(user);
    }

    public String generateVerificationCode() {
        String code = String.valueOf(random.nextInt(900000) + 100000);
        return code;
    }
}