INSERT INTO users (email, password_hash, firstname, lastname, is_enabled, role, department) VALUES
('user2@company.com', '$2a$12$Wt6zCJkUJ3D4E9X8Qr7Z5eB1n2vC3x5z7A9B1D3F5H7J9K1L3N5P7R9T1V3X5Z', 'Анна', 'Морозова', true, 'ROLE_USER', 'VITEBSK'),
('user3@company.com', '$2a$12$Wt6zCJkUJ3D4E9X8Qr7Z5eB1n2vC3x5z7A9B1D3F5H7J9K1L3N5P7R9T1V3X5Z', 'Мария', 'Васильева', true, 'ROLE_MENTOR', 'MINSK'),
('user4@company.com', '$2a$12$Wt6zCJkUJ3D4E9X8Qr7Z5eB1n2vC3x5z7A9B1D3F5H7J9K1L3N5P7R9T1V3X5Z', 'Сергей', 'Попов', true, 'ROLE_USER', 'MINSK');

INSERT INTO groups (course_id) VALUES
(1),
(2),
(3);

INSERT INTO users_groups (user_id, group_id) VALUES
(1, 1),
(2, 1),
(3, 1);