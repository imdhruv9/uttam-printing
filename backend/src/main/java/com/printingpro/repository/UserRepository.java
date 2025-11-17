package com.printingpro.repository;

import com.printingpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository for User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Find user by username (email).
     */
    Optional<User> findByUsername(String username);

    /**
     * Check if a username already exists.
     */
    boolean existsByUsername(String username);
}

