-- Insert admin user for Uttam Printing
-- Default password (BCrypt hashed) - See ENV_TEMPLATE.md for setup
-- IMPORTANT: Change this password immediately after first login!
INSERT INTO users (id, username, password_hash, roles, created_at)
VALUES (
    gen_random_uuid(),
    'admin@uttamprinting.com',
    '$2a$10$xqWfPjZHxGRJSvZ8N2HqHO8z1QkP5PfqL0yYnqZNlJKLqZmDxqYPi',
    'ROLE_USER,ROLE_ADMIN',
    CURRENT_TIMESTAMP
);

-- Insert sample products
-- Flex Printing products
INSERT INTO products (id, name, description, category, price_per_sqft, negotiable, created_at, updated_at)
VALUES
    (gen_random_uuid(),
     'Premium Vinyl Banner',
     'High-quality outdoor vinyl banner perfect for storefronts, events, and advertising. Waterproof and UV resistant, ideal for long-term outdoor use. Features vibrant colors that won''t fade in sunlight.',
     'FLEX_PRINTING',
     25.50,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'Mesh Banner',
     'Wind-resistant mesh banner ideal for large outdoor installations. Allows wind to pass through, reducing stress on mounting points. Perfect for building wraps and fence advertising.',
     'FLEX_PRINTING',
     22.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'Backlit Flex Banner',
     'Translucent flex material designed for backlit displays. Creates stunning illuminated signage for storefronts and lightboxes. High opacity and excellent light diffusion.',
     'FLEX_PRINTING',
     30.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP);

-- More Flex Printing products (posters, standees, displays, etc.)
INSERT INTO products (id, name, description, category, price_per_sqft, negotiable, created_at, updated_at)
VALUES
    (gen_random_uuid(),
     'Glossy Photo Poster',
     'High-resolution glossy poster with vivid colors and sharp details. Perfect for promotional materials, event announcements, and retail displays. Premium photo-quality finish.',
     'FLEX_PRINTING',
     15.00,
     false,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'Matte Finish Poster',
     'Professional matte poster with anti-glare finish. Ideal for indoor displays, presentations, and retail environments. Reduces reflections for better visibility.',
     'FLEX_PRINTING',
     12.50,
     false,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),

    (gen_random_uuid(),
     'Roll-Up Banner Stand',
     'Portable roll-up standee with aluminum base and retractable mechanism. Easy to transport and set up in minutes. Includes carrying case. Perfect for exhibitions and trade shows.',
     'FLEX_PRINTING',
     45.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'X-Banner Stand',
     'Lightweight X-frame banner stand for quick setup and portability. Stable design with adjustable height. Great for retail displays and temporary promotions.',
     'FLEX_PRINTING',
     35.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),

    (gen_random_uuid(),
     'Foam Board Display',
     'Rigid foam board mounting perfect for indoor displays. Lightweight yet sturdy, with smooth surface for high-quality printing. Ideal for presentations and point-of-sale displays.',
     'FLEX_PRINTING',
     18.00,
     false,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'Canvas Print',
     'Premium canvas print with gallery-wrap finish. Adds artistic touch to indoor spaces. Perfect for restaurants, offices, and retail environments.',
     'FLEX_PRINTING',
     28.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),

    (gen_random_uuid(),
     'Billboard Print',
     'Large-format billboard printing for highway and urban advertising. Weather-resistant materials suitable for extended outdoor exposure. High-impact visual quality.',
     'FLEX_PRINTING',
     35.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'A-Frame Sidewalk Sign',
     'Double-sided A-frame sign for sidewalk advertising. Weather-resistant with easy-change graphics. Perfect for restaurants, retail stores, and service businesses.',
     'FLEX_PRINTING',
     40.00,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP);

-- Pamphlet products (business cards, brochures, flyers - priced per piece)
INSERT INTO products (id, name, description, category, price_per_sqft, negotiable, created_at, updated_at)
VALUES
    (gen_random_uuid(),
     'Premium Business Cards',
     'High-quality business cards on premium card stock. Available in glossy or matte finish. Standard size with full-color printing on both sides. Makes a lasting impression.',
     'PAMPHLET',
     0.50,
     false,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'Embossed Business Cards',
     'Luxury embossed business cards with raised text or logo. Premium thick card stock with elegant finish. Stand out from the competition with tactile quality.',
     'PAMPHLET',
     0.75,
     true,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),

    (gen_random_uuid(),
     'Tri-Fold Brochure',
     'Professional tri-fold brochures on quality paper stock. Full-color printing with multiple finish options. Perfect for product catalogs, event programs, and marketing materials.',
     'PAMPHLET',
     2.50,
     false,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP),
    
    (gen_random_uuid(),
     'Flyer/Leaflet',
     'Single-page flyers for mass distribution. Cost-effective solution for promotional campaigns, event announcements, and local advertising. Available in multiple sizes.',
     'PAMPHLET',
     1.00,
     false,
     CURRENT_TIMESTAMP,
     CURRENT_TIMESTAMP);

-- Note: Product images would typically be added via the admin panel after uploading actual image files.
-- For development/testing, you can add sample image URLs here if you have placeholder images.

