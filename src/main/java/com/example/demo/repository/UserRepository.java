package com.example.demo.repository;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
    @Query(
            value = "select u.password from libuser u where u.email=?1",
            nativeQuery = true
    )
    String getPasswordByEmail(String email);

    @Query(
            value = "select u.user_id from libuser u where u.email=?1",
            nativeQuery = true
    )
    long getIdByEmail(String email);

    @Query(
            value = "select u.first_name from libuser u where u.email=?1",
            nativeQuery = true
    )
    String getFirstNameByEmail(String email);

    @Query(
            value = "select u.last_name from libuser u where u.email=?1",
            nativeQuery = true
    )
    String getLastNameByEmail(String email);
}
