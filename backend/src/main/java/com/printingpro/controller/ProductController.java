package com.printingpro.controller;

import com.printingpro.dto.response.ProductResponse;
import com.printingpro.entity.ProductCategory;
import com.printingpro.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * Public controller for browsing products.
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Products", description = "Public product browsing APIs")
public class ProductController {

    private final ProductService productService;

    /**
     * Get all products with optional filters and pagination.
     */
    @GetMapping
    @Operation(summary = "Get all products", description = "Get paginated list of products with optional filters")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {


        List<ProductResponse> products = productService.getAllProducts();

        return ResponseEntity.ok(products);
    }

    /**
     * Get a single product by ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID", description = "Get detailed information about a specific product")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable UUID id) {
        log.debug("Fetching product with id: {}", id);
        ProductResponse product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }
}

