package com.printingpro.service;

import com.printingpro.dto.request.ContactRequest;
import com.printingpro.dto.response.ContactResponse;
import com.printingpro.entity.ContactMessage;
import com.printingpro.entity.Product;
import com.printingpro.mapper.ContactMapper;
import com.printingpro.repository.ContactMessageRepository;
import com.printingpro.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Service for managing contact messages.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ProductRepository productRepository;
    private final ContactMapper contactMapper;
    private final EmailService emailService;

    /**
     * Submit a contact message.
     * Optionally associates the message with a product.
     */
    @Transactional
    public ContactResponse submitContactMessage(ContactRequest request) {
        log.info("Submitting contact message from: {}", request.getEmail());

        Product product = null;
        if (request.getProductId() != null) {
            // Find the product if a productId is provided (product may not exist, which is okay)
            product = productRepository.findById(request.getProductId()).orElse(null);
            if (product != null) {
                log.debug("Contact message associated with product: {}", product.getId());
            }
        }

        ContactMessage message = contactMapper.toEntity(request, product);
        ContactMessage savedMessage = contactMessageRepository.save(message);

        // Send email notification asynchronously
        try {
            emailService.sendContactFormEmail(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getMessage(),
                request.getProductId()
            );
            log.info("Contact message submitted successfully and email notification sent. ID: {}", savedMessage.getId());
        } catch (Exception e) {
            // Log the error but don't fail the request
            log.error("Failed to send email notification for contact message: {}", savedMessage.getId(), e);
        }

        return contactMapper.toResponse(savedMessage);
    }

    /**
     * Get all contact messages (for admin).
     */
    public Page<ContactResponse> getAllMessages(Pageable pageable) {
        log.debug("Fetching all contact messages");
        Page<ContactMessage> messages = contactMessageRepository.findAllByOrderByCreatedAtDesc(pageable);
        return messages.map(contactMapper::toResponse);
    }

    /**
     * Get contact messages by email (for admin).
     */
    public Page<ContactResponse> getMessagesByEmail(String email, Pageable pageable) {
        log.debug("Fetching contact messages for email: {}", email);
        Page<ContactMessage> messages = contactMessageRepository.findByEmailOrderByCreatedAtDesc(email, pageable);
        return messages.map(contactMapper::toResponse);
    }
}

