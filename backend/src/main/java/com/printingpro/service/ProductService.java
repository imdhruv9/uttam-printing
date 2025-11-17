package com.printingpro.service;

import com.printingpro.dto.request.ProductRequest;
import com.printingpro.dto.response.ProductResponse;
import com.printingpro.entity.Product;
import com.printingpro.entity.ProductCategory;
import com.printingpro.exception.ResourceNotFoundException;
import com.printingpro.exception.ValidationException;
import com.printingpro.mapper.ProductMapper;
import com.printingpro.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Service for managing products.
 * Handles business logic for product CRUD operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    /**
     * Get all products with optional filters and pagination.
     */
    public List<ProductResponse> getAllProducts() {


        List<Product> products = productRepository.findAll();
        return products.stream().map(productMapper::toResponse).toList();
    }

    /**
     * Get a single product by ID.
     */
    public ProductResponse getProductById(UUID id) {
        log.debug("Fetching product with id: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        return productMapper.toResponse(product);
    }

    /**
     * Create a new product.
     * Validates that at least one image is provided.
     */
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        log.info("Creating new product: {}", request.getName());

        // Validate that at least one image is provided
        if (request.getImages() == null || request.getImages().isEmpty()) {
            throw new ValidationException("At least one product image is required");
        }

        Product product = productMapper.toEntity(request);
        Product savedProduct = productRepository.save(product);

        log.info("Product created successfully with id: {}", savedProduct.getId());
        return productMapper.toResponse(savedProduct);
    }

    /**
     * Update an existing product.
     */
    @Transactional
    public ProductResponse updateProduct(UUID id, ProductRequest request) {
        log.info("Updating product with id: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        productMapper.updateEntity(product, request);
        Product updatedProduct = productRepository.save(product);

        log.info("Product updated successfully: {}", id);
        return productMapper.toResponse(updatedProduct);
    }

    /**
     * Delete a product by ID.
     */
    @Transactional
    public void deleteProduct(UUID id) {
        log.info("Deleting product with id: {}", id);

        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }

        productRepository.deleteById(id);
        log.info("Product deleted successfully: {}", id);
    }

    /**
     * Get product count by category (for admin analytics).
     */
    public Map<String, Long> getProductCountByCategory() {
        log.debug("Fetching product count by category");

        Map<String, Long> categoryCount = new HashMap<>();
        for (ProductCategory category : ProductCategory.values()) {
            long count = productRepository.countByCategory(category);
            categoryCount.put(category.name(), count);
        }

        return categoryCount;
    }

    /**
     * Get total product count.
     */
    public long getTotalProductCount() {
        return productRepository.count();
    }
}

