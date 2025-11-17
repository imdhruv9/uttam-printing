package com.printingpro.mapper;

import com.printingpro.dto.request.ProductImageRequest;
import com.printingpro.dto.request.ProductRequest;
import com.printingpro.dto.response.ProductImageResponse;
import com.printingpro.dto.response.ProductResponse;
import com.printingpro.entity.Product;
import com.printingpro.entity.ProductImage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper component for converting between Product entities and DTOs.
 * Implemented as a Spring @Component (not static methods) following best practices.
 */
@Component
public class ProductMapper {

    /**
     * Converts ProductRequest DTO to Product entity.
     * Used for creating new products.
     */
    public Product toEntity(ProductRequest request) {
        if (request == null) {
            return null;
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .pricePerSqft(request.getPricePerSqft())
                .negotiable(request.getNegotiable() != null ? request.getNegotiable() : true)
                .images(new ArrayList<>())
                .build();

        // Map images and establish bidirectional relationship
        if (request.getImages() != null) {
            for (ProductImageRequest imageRequest : request.getImages()) {
                ProductImage image = toImageEntity(imageRequest);
                product.addImage(image);
            }
        }

        return product;
    }

    /**
     * Updates an existing Product entity with data from ProductRequest.
     * Preserves ID and timestamps.
     */
    public void updateEntity(Product product, ProductRequest request) {
        if (product == null || request == null) {
            return;
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPricePerSqft(request.getPricePerSqft());
        product.setNegotiable(request.getNegotiable() != null ? request.getNegotiable() : true);

        // Update images: clear existing and add new ones
        if (request.getImages() != null) {
            product.getImages().clear();
            for (ProductImageRequest imageRequest : request.getImages()) {
                ProductImage image = toImageEntity(imageRequest);
                product.addImage(image);
            }
        }
    }

    /**
     * Converts Product entity to ProductResponse DTO.
     */
    public ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory())
                .pricePerSqft(product.getPricePerSqft())
                .negotiable(product.getNegotiable())
                .images(toImageResponseList(product.getImages()))
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    /**
     * Converts a list of Product entities to ProductResponse DTOs.
     */
    public List<ProductResponse> toResponseList(List<Product> products) {
        if (products == null) {
            return new ArrayList<>();
        }
        return products.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Converts ProductImageRequest to ProductImage entity.
     */
    private ProductImage toImageEntity(ProductImageRequest request) {
        if (request == null) {
            return null;
        }

        return ProductImage.builder()
                .url(request.getUrl())
                .altText(request.getAltText())
                .ordering(request.getOrdering() != null ? request.getOrdering() : 0)
                .build();
    }

    /**
     * Converts ProductImage entity to ProductImageResponse DTO.
     */
    private ProductImageResponse toImageResponse(ProductImage image) {
        if (image == null) {
            return null;
        }

        return ProductImageResponse.builder()
                .id(image.getId())
                .url(image.getUrl())
                .altText(image.getAltText())
                .ordering(image.getOrdering())
                .build();
    }

    /**
     * Converts a list of ProductImage entities to ProductImageResponse DTOs.
     */
    private List<ProductImageResponse> toImageResponseList(List<ProductImage> images) {
        if (images == null) {
            return new ArrayList<>();
        }
        return images.stream()
                .map(this::toImageResponse)
                .collect(Collectors.toList());
    }
}

