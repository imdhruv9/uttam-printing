package com.printingpro.controller;

import com.printingpro.dto.request.ContactRequest;
import com.printingpro.dto.response.ContactResponse;
import com.printingpro.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Public controller for contact form submissions.
 */
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Contact", description = "Contact form management APIs")
public class ContactController {

    private final ContactService contactService;

    /**
     * Submit a contact message.
     */
    @PostMapping
    @Operation(summary = "Submit contact message", description = "Submit a contact form inquiry")
    public ResponseEntity<ContactResponse> submitContact(@Valid @RequestBody ContactRequest request) {
        log.info("Receiving contact message from: {}", request.getEmail());
        ContactResponse response = contactService.submitContactMessage(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

