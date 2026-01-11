package com.apointy.booking_service.repositories;

import com.apointy.booking_service.enums.AppointmentStatus;
import com.apointy.booking_service.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.service WHERE a.userId = :userId")
    List<Appointment> findAppointmentsByUserId(@Param("userId") Long userId);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.service WHERE a.service.userId = :userId AND (:status IS NULL OR a.status = :status)")
    List<Appointment> getAppointmentByOwnerId(@Param("userId") Long userId, @Param("status") AppointmentStatus status);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.service WHERE a.service.id = :serviceId AND a.date = :date")
    List<Appointment> findAppointmentsByServiceIdAndDate(@Param("serviceId") Long serviceId, @Param("date") LocalDate date);

}
