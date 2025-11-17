package com.printingpro.config;

import com.printingpro.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

/**
 * Web configuration for serving static resources (uploaded images) and CORS.
 */
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final FileStorageService fileStorageService;

    /**
     * Configure CORS to allow requests from frontend domain.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://zippy-heliotrope-d155c9.netlify.app",
                        "http://localhost:3000",
                        "http://localhost:5173"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    /**
     * Configure resource handlers to serve uploaded files.
     * Maps /uploads/** URL pattern to the file storage directory.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadPath = fileStorageService.getFileStorageLocation();
        String uploadDir = "file:" + uploadPath.toAbsolutePath() + "/";

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadDir);
    }
}

