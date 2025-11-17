-- Check if admin user exists and what the data looks like
SELECT 
    id,
    username,
    LEFT(password_hash, 20) as password_hash_preview,
    roles,
    created_at
FROM users 
WHERE username = 'admin@printingpro.com';

-- If no results, show all users
SELECT 
    'All users:' as info,
    username,
    roles
FROM users;

