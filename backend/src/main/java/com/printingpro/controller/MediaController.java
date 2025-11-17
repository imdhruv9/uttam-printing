package com.printingpro.controller;

import com.printingpro.dto.response.FileUploadResponse;
import com.printingpro.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Controller for file upload operations.
 * Requires ROLE_ADMIN authentication.
 */
@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Media", description = "File upload management APIs")
@SecurityRequirement(name = "bearerAuth")
public class MediaController {

    private final FileStorageService fileStorageService;

    /**
     * Upload an image file.
     */
    @PostMapping("/upload")
    @Operation(summary = "Upload file", description = "Upload an image file (Admin only)")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("Uploading file: {}", file.getOriginalFilename());

        String url = fileStorageService.storeFile(file);
        String filename = url.substring(url.lastIndexOf('/') + 1);

        FileUploadResponse response = FileUploadResponse.builder()
                .url(url)
                .filename(filename)
                .build();

        log.info("File uploaded successfully: {}", filename);
        return ResponseEntity.ok(response);
    }
}

