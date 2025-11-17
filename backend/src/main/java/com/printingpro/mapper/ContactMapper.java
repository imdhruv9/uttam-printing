package com.printingpro.mapper;

import com.printingpro.dto.request.ContactRequest;
import com.printingpro.dto.response.ContactResponse;
import com.printingpro.entity.ContactMessage;
import com.printingpro.entity.Product;
import org.springframework.stereotype.Component;

/**
 * Mapper component for converting between ContactMessage entities and DTOs.
 */
@Component
public class ContactMapper {

    /**
     * Converts ContactRequest DTO to ContactMessage entity.
     * Product reference must be set separately in the service layer.
     */
    public ContactMessage toEntity(ContactRequest request) {
        if (request == null) {
            return null;
        }

        return ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .build();
    }

    /**
     * Converts ContactRequest DTO to ContactMessage entity with product reference.
     */
    public ContactMessage toEntity(ContactRequest request, Product product) {
        ContactMessage message = toEntity(request);
        if (message != null && product != null) {
            message.setProduct(product);
        }
        return message;
    }

    /**
     * Converts ContactMessage entity to ContactResponse DTO.
     */
    public ContactResponse toResponse(ContactMessage message) {
        if (message == null) {
            return null;
        }

        return ContactResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .phone(message.getPhone())
                .message(message.getMessage())
                .productId(message.getProduct() != null ? message.getProduct().getId() : null)
                .createdAt(message.getCreatedAt())
                .build();
    }
}

