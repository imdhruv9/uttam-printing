-- Reset database for Uttam Printing
-- Run this in DBeaver or psql connected to the 'printing' database

-- Step 1: Drop all tables if they exist
DROP TABLE IF EXISTS contact_message CASCADE;
DROP TABLE IF EXISTS product_image CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Step 2: Drop Flyway history to start fresh
DROP TABLE IF EXISTS flyway_schema_history CASCADE;

-- Now restart your Spring Boot application
-- Flyway will detect no history and run all migrations from V1 to V3

