package com.printingpro.repository;

import com.printingpro.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Repository for ContactMessage entity.
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, UUID> {

    /**
     * Find all contact messages ordered by creation date (newest first).
     */
    Page<ContactMessage> findAllByOrderByCreatedAtDesc(Pageable pageable);

    /**
     * Find contact messages by email.
     */
    Page<ContactMessage> findByEmailOrderByCreatedAtDesc(String email, Pageable pageable);
}

