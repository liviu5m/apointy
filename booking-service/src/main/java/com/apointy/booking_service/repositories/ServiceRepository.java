package com.apointy.booking_service.repositories;

import com.apointy.booking_service.dtos.PriceDto;
import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.models.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    @Query("SELECT s FROM Service s LEFT JOIN FETCH s.category WHERE s.userId = :userId")
    List<Service> findAllByUserIdWithCategories(@Param("userId") Long userId);

    @Query("SELECT s FROM Service s LEFT JOIN FETCH s.category")
    List<Service> findAllByWithCategories();

    List<Service> findAllByUserId(Long userId);

    @Query(value = "SELECT s FROM Service s LEFT JOIN s.category c WHERE " +
            "(:name IS NULL OR LOWER(s.name) LIKE LOWER(CAST(CONCAT('%', :name, '%') AS text))) AND " +
            "(:categoryId IS NULL OR c.id = :categoryId) AND " +
            "(:duration IS NULL OR s.duration = :duration) AND " +
            "(:minPrice IS NULL OR s.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR s.price <= :maxPrice) AND " +
            "s.available = true",
            countQuery = "SELECT COUNT(s) FROM Service s LEFT JOIN s.category c WHERE " +
                    "(:name IS NULL OR LOWER(s.name) LIKE LOWER(CAST(CONCAT('%', :name, '%') AS text))) AND " +
                    "(:categoryId IS NULL OR c.id = :categoryId) AND " +
                    "(:duration IS NULL OR s.duration = :duration) AND " +
                    "(:minPrice IS NULL OR s.price >= :minPrice) AND " +
                    "(:maxPrice IS NULL OR s.price <= :maxPrice) AND " +
                    "s.available = true")
    Page<Service> findServicesWithFilters(
            @Param("name") String name,
            @Param("categoryId") Long categoryId,
            @Param("duration") ServiceDuration duration,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );

    @Query("SELECT MIN(s.price) as minPrice, MAX(s.price) as maxPrice FROM Service s WHERE s.available = true")
    Object[] getPriceRange();
}