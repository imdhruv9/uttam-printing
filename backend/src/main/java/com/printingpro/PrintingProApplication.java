package com.printingpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main application class for PrintingPro.
 * 
 * This is a printing press storefront application that allows:
 * - Public users to browse products and submit contact forms
 * - Admin users to manage products with full CRUD operations
 */
@SpringBootApplication
@EnableJpaAuditing
public class PrintingProApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrintingProApplication.class, args);
    }
}

