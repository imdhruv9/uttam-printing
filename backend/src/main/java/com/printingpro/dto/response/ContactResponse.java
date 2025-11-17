package com.printingpro.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for contact message response.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactResponse {

    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private UUID productId;
    private LocalDateTime createdAt;
}

