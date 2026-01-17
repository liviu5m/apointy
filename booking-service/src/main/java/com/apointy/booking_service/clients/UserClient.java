package com.apointy.booking_service.clients;

import com.apointy.booking_service.dtos.BusinessDto;
import com.apointy.booking_service.dtos.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@FeignClient(name = "user-service", url = "${application.services.user.url}/api")
public interface UserClient {

    @GetMapping("/users/{id}")
    UserDto getUserById(@PathVariable("id") Long id);

    @GetMapping("/users/batch")
    List<UserDto> getAllUsersById(@RequestParam("ids") Set<Long> ids);

    @GetMapping("/business/user")
    BusinessDto getBusinessByUserId(@RequestParam("userId") Long userId);

    @GetMapping("/business/user-batch")
    List<BusinessDto> getBusinessBatch(@RequestParam("ids") Set<Long> ids);
}
