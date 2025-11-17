-- RESET DATABASE FOR UTTAM PRINTING
-- Run this in DBeaver connected to 'printing' database

-- Step 1: Delete all existing data (preserves table structure)
DELETE FROM product_image;
DELETE FROM contact_message;
DELETE FROM products;
DELETE FROM users;

-- Step 2: Reset Flyway history so migrations run again
DROP TABLE IF EXISTS flyway_schema_history CASCADE;

-- Step 3: Restart your Spring Boot backend
-- Flyway will re-run V1 (create tables) and V2 (seed data with new categories)

-- After restart, you'll have:
-- - 11 Flex Printing products (priced per sq ft)
-- - 4 Pamphlet products (priced per piece)
-- - Admin user: admin@uttamprinting.com / Admin@123456

