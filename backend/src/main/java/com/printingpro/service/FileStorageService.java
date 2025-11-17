package com.printingpro.service;

import com.printingpro.exception.FileStorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Service for handling file uploads and storage.
 * In development, files are stored locally.
 * In production, this can be extended to use S3 or other cloud storage.
 */
@Service
@Slf4j
public class FileStorageService {

    private final Path fileStorageLocation;
    private final List<String> allowedExtensions;

    public FileStorageService(
            @Value("${file.upload-dir}") String uploadDir,
            @Value("${file.allowed-extensions}") String allowedExtensions
    ) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.allowedExtensions = Arrays.asList(allowedExtensions.split(","));

        try {
            Files.createDirectories(this.fileStorageLocation);
            log.info("File storage location initialized: {}", this.fileStorageLocation);
        } catch (IOException ex) {
            throw new FileStorageException("Could not create upload directory", ex);
        }
    }

    /**
     * Store a file and return its URL.
     */
    public String storeFile(MultipartFile file) {
        // Validate file
        if (file.isEmpty()) {
            throw new FileStorageException("Cannot store empty file");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        validateFileName(originalFilename);
        validateFileExtension(originalFilename);

        try {
            // Generate unique filename to prevent collisions
            String fileExtension = getFileExtension(originalFilename);
            String newFilename = UUID.randomUUID().toString() + "." + fileExtension;

            // Copy file to target location
            Path targetLocation = this.fileStorageLocation.resolve(newFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            log.info("File stored successfully: {}", newFilename);

            // Return URL path (relative)
            return "/uploads/" + newFilename;

        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + originalFilename, ex);
        }
    }

    /**
     * Validate that the filename doesn't contain invalid characters.
     */
    private void validateFileName(String filename) {
        if (filename.contains("..")) {
            throw new FileStorageException("Filename contains invalid path sequence: " + filename);
        }
    }

    /**
     * Validate that the file extension is allowed.
     */
    private void validateFileExtension(String filename) {
        String extension = getFileExtension(filename).toLowerCase();
        if (!allowedExtensions.contains(extension)) {
            throw new FileStorageException(
                    "File type not allowed. Allowed types: " + String.join(", ", allowedExtensions)
            );
        }
    }

    /**
     * Extract file extension from filename.
     */
    private String getFileExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            throw new FileStorageException("File must have an extension");
        }
        return filename.substring(lastDotIndex + 1);
    }

    /**
     * Get the storage location path (for serving files).
     */
    public Path getFileStorageLocation() {
        return fileStorageLocation;
    }
}

