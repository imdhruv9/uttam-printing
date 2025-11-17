package com.printingpro.service;

import com.printingpro.dto.request.ProductRequest;
import com.printingpro.dto.response.ProductResponse;
import com.printingpro.entity.Product;
import com.printingpro.entity.ProductCategory;
import com.printingpro.exception.ResourceNotFoundException;
import com.printingpro.exception.ValidationException;
import com.printingpro.mapper.ProductMapper;
import com.printingpro.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for ProductService.
 */
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductService productService;

    private Product testProduct;
    private ProductRequest testRequest;
    private ProductResponse testResponse;
    private UUID testId;

    @BeforeEach
    void setUp() {
        testId = UUID.randomUUID();

        testProduct = Product.builder()
                .id(testId)
                .name("Test Product")
                .description("Test Description")
                .category(ProductCategory.FLEX_PRINTING)
                .pricePerSqft(new BigDecimal("15.00"))
                .negotiable(true)
                .images(new ArrayList<>())
                .build();

        testRequest = ProductRequest.builder()
                .name("Test Product")
                .description("Test Description")
                .category(ProductCategory.FLEX_PRINTING)
                .pricePerSqft(new BigDecimal("15.00"))
                .negotiable(true)
                .images(new ArrayList<>())
                .build();

        testResponse = ProductResponse.builder()
                .id(testId)
                .name("Test Product")
                .description("Test Description")
                .category(ProductCategory.FLEX_PRINTING)
                .pricePerSqft(new BigDecimal("15.00"))
                .negotiable(true)
                .images(new ArrayList<>())
                .build();
    }

    @Test
    void getProductById_WhenProductExists_ReturnsProduct() {
        // Arrange
        when(productRepository.findById(testId)).thenReturn(Optional.of(testProduct));
        when(productMapper.toResponse(testProduct)).thenReturn(testResponse);

        // Act
        ProductResponse result = productService.getProductById(testId);

        // Assert
        assertNotNull(result);
        assertEquals(testId, result.getId());
        assertEquals("Test Product", result.getName());
        verify(productRepository).findById(testId);
        verify(productMapper).toResponse(testProduct);
    }

    @Test
    void getProductById_WhenProductNotFound_ThrowsException() {
        // Arrange
        when(productRepository.findById(testId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.getProductById(testId);
        });
        verify(productRepository).findById(testId);
        verify(productMapper, never()).toResponse(any());
    }

    @Test
    void createProduct_WithValidRequest_CreatesProduct() {
        // Arrange
        testRequest.getImages().add(new com.printingpro.dto.request.ProductImageRequest());
        when(productMapper.toEntity(testRequest)).thenReturn(testProduct);
        when(productRepository.save(testProduct)).thenReturn(testProduct);
        when(productMapper.toResponse(testProduct)).thenReturn(testResponse);

        // Act
        ProductResponse result = productService.createProduct(testRequest);

        // Assert
        assertNotNull(result);
        assertEquals(testId, result.getId());
        verify(productMapper).toEntity(testRequest);
        verify(productRepository).save(testProduct);
        verify(productMapper).toResponse(testProduct);
    }

    @Test
    void createProduct_WithNoImages_ThrowsValidationException() {
        // Arrange
        testRequest.setImages(new ArrayList<>()); // Empty images list

        // Act & Assert
        assertThrows(ValidationException.class, () -> {
            productService.createProduct(testRequest);
        });
        verify(productMapper, never()).toEntity(any());
        verify(productRepository, never()).save(any());
    }

    @Test
    void updateProduct_WhenProductExists_UpdatesProduct() {
        // Arrange
        when(productRepository.findById(testId)).thenReturn(Optional.of(testProduct));
        when(productRepository.save(testProduct)).thenReturn(testProduct);
        when(productMapper.toResponse(testProduct)).thenReturn(testResponse);

        // Act
        ProductResponse result = productService.updateProduct(testId, testRequest);

        // Assert
        assertNotNull(result);
        verify(productRepository).findById(testId);
        verify(productMapper).updateEntity(testProduct, testRequest);
        verify(productRepository).save(testProduct);
    }

    @Test
    void deleteProduct_WhenProductExists_DeletesProduct() {
        // Arrange
        when(productRepository.existsById(testId)).thenReturn(true);

        // Act
        productService.deleteProduct(testId);

        // Assert
        verify(productRepository).existsById(testId);
        verify(productRepository).deleteById(testId);
    }

    @Test
    void deleteProduct_WhenProductNotFound_ThrowsException() {
        // Arrange
        when(productRepository.existsById(testId)).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            productService.deleteProduct(testId);
        });
        verify(productRepository).existsById(testId);
        verify(productRepository, never()).deleteById(any());
    }

    @Test
    void getTotalProductCount_ReturnsCount() {
        // Arrange
        when(productRepository.count()).thenReturn(10L);

        // Act
        long count = productService.getTotalProductCount();

        // Assert
        assertEquals(10L, count);
        verify(productRepository).count();
    }
}

