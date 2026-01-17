package com.apointy.auth_service.repositories;

import com.apointy.auth_service.models.Business;
import com.apointy.auth_service.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessRepository extends JpaRepository<Business,Long> {

    Business findByUserId(Long userId);
    @Query("SELECT b FROM Business b JOIN FETCH b.user WHERE b.user.id IN :ids")
    List<Business> findBusinessesByBatchIds(@Param("ids") List<Long> ids);

}
