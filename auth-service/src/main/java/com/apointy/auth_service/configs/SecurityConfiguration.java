package com.apointy.auth_service.configs;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                // 1. Disable CORS here so it doesn't conflict with Gateway
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(auth -> auth
                        // 2. Make sure this matches your controller path exactly
                        .requestMatchers("/user/**", "/error").permitAll()
                        .anyRequest().authenticated()
                )
                // 3. THIS IS THE KEY: Replace the redirect with a 401 error
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("{\"message\": \"Unauthorized\"}");
                        })
                )
                // 4. Disable the default login form that causes the redirect
                .formLogin(f -> f.disable())
                .httpBasic(h -> h.disable());

        return http.build();
    }
}