package com.printingpro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Configuration for enabling asynchronous method execution
 */
@Configuration
@EnableAsync
public class AsyncConfig {
    // Async is now enabled for methods annotated with @Async
}

