package com.apointy.booking_service.repositories;

import com.apointy.booking_service.dtos.PriceDto;
import com.apointy.booking_service.models.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    // 1. Added FETCH to load the category object entirely
    @Query("SELECT s FROM Service s LEFT JOIN FETCH s.category WHERE s.userId = :userId")
    List<Service> findAllByUserIdWithCategories(@Param("userId") Long userId);

    @Query("SELECT s FROM Service s LEFT JOIN FETCH s.category")
    List<Service> findAllByWithCategories();

    List<Service> findAllByUserId(Long userId);

    // 2. Fixed Native Query: Joined the table properly and fixed the category filter
    @Query(value = "SELECT s.* FROM service s " +
            "LEFT JOIN service_category c ON s.category_id = c.id WHERE " +
            "(:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:category IS NULL OR c.name = :category) AND " +
            "(:duration IS NULL OR s.duration = :duration) AND " +
            "(:minPrice IS NULL OR s.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR s.price <= :maxPrice) AND " +
            "s.available = true",
            nativeQuery = true)
    List<Service> findServicesWithFilters(
            @Param("name") String name,
            @Param("category") String category, // This compares to c.name now
            @Param("duration") String duration,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

    @Query("SELECT MIN(s.price) as minPrice, MAX(s.price) as maxPrice FROM Service s WHERE s.available = true")
    Object[] getPriceRange();
}