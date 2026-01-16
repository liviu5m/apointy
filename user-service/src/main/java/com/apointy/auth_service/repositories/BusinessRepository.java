package com.apointy.auth_service.repositories;

import com.apointy.auth_service.models.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestHeader;

@Repository
public interface BusinessRepository extends JpaRepository<Business,Long> {

    Business getBusinessByUserId(@RequestHeader("X-User-Id") Long userId);

}
