package com.printingpro.controller;

import com.printingpro.dto.request.ProductRequest;
import com.printingpro.dto.response.ProductResponse;
import com.printingpro.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

/**
 * Admin controller for product management (CRUD operations).
 * Requires ROLE_ADMIN authentication.
 */
@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin - Products", description = "Admin product management APIs")
@SecurityRequirement(name = "bearerAuth")
public class AdminProductController {

    private final ProductService productService;

    /**
     * Create a new product.
     */
    @PostMapping
    @Operation(summary = "Create product", description = "Create a new product (Admin only)")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        log.info("Admin creating new product: {}", request.getName());
        ProductResponse response = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Update an existing product.
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update product", description = "Update an existing product (Admin only)")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody ProductRequest request
    ) {
        log.info("Admin updating product: {}", id);
        ProductResponse response = productService.updateProduct(id, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete a product.
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product", description = "Delete a product (Admin only)")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        log.info("Admin deleting product: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get product analytics (count by category).
     */
    @GetMapping("/analytics/by-category")
    @Operation(summary = "Get product analytics", description = "Get product count by category (Admin only)")
    public ResponseEntity<Map<String, Long>> getProductCountByCategory() {
        log.debug("Admin fetching product analytics");
        Map<String, Long> analytics = productService.getProductCountByCategory();
        return ResponseEntity.ok(analytics);
    }

    /**
     * Get total product count.
     */
    @GetMapping("/analytics/total")
    @Operation(summary = "Get total product count", description = "Get total number of products (Admin only)")
    public ResponseEntity<Map<String, Long>> getTotalProductCount() {
        log.debug("Admin fetching total product count");
        long count = productService.getTotalProductCount();
        return ResponseEntity.ok(Map.of("total", count));
    }
}

