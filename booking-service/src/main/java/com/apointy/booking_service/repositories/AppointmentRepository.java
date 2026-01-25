package com.apointy.booking_service.repositories;

import com.apointy.booking_service.enums.AppointmentStatus;
import com.apointy.booking_service.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

@Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.service WHERE a.userId = :userId ORDER BY a.date DESC, a.time ASC, a.status")
    List<Appointment> findAppointmentsByUserId(@Param("userId") Long userId);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.service WHERE a.service.userId = :userId AND (:status IS NULL OR a.status = :status) ORDER BY a.date DESC, a.time ASC, a.status")
    List<Appointment> getAppointmentByOwnerId(@Param("userId") Long userId, @Param("status") AppointmentStatus status);

    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.service WHERE a.service.id = :serviceId AND a.date = :date ORDER BY a.time ASC")
    List<Appointment> findAppointmentsByServiceIdAndDate(@Param("serviceId") Long serviceId, @Param("date") LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE (a.status = PENDING OR a.status = CONFIRMED) AND " +
            "(a.date < :currentDate OR (a.date = :currentDate AND a.time < :currentTime))")
    List<Appointment> findExpiredAppointments(
            @Param("currentDate") LocalDate currentDate,
            @Param("currentTime") LocalTime currentTime
    );

    @Query("SELECT COUNT(a) + 1 FROM Appointment a " +
            "WHERE a.date = :date " +
            "AND a.status = :status " +
            "AND a.time < :time " +
            "AND a.service.id = :serviceId")
    int getQueuePosition(@Param("date") LocalDate date, @Param("serviceId") Long serviceId, @Param("time") LocalTime time, @Param("status") AppointmentStatus status);

    @Query("SELECT a FROM Appointment a WHERE a.date = :date " +
            "AND a.status = :status " +
            "AND a.reminderSent = false " +
            "AND a.time BETWEEN :startTime AND :endTime")
    List<Appointment> findAppointmentsNeedingReminder(
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("status") AppointmentStatus status
    );
}
