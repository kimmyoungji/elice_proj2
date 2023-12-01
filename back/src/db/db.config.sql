CREATE DATABASE turtine; 

USE turtine;

CREATE TABLE habits (
    habit_id VARCHAR(100) PRIMARY KEY ,
    habit_title VARCHAR(50) NOT NULL,
    discription VARCHAR(300),
    target_days INT NOT NULL,
    trash_type VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id VARCHAR(100) PRIMARY KEY ,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    level INT NOT NULL DEFAULT 0
);

CREATE TABLE fulfilled_habits (
    fulfilled_habit_id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    habit_id VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id)
);

CREATE TABLE planned_habits (
    planned_habit_id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    habit_id VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- UUID() 사용이전
INSERT INTO habits (habit_title, discription, target_days, trash_type) 
VALUES
    ('1a2b3c','장바구니 (에코백) 사용하기', '장바구니를 사용하면 일회용 비닐봉투의 사용을 줄일 수 있습니다.', 10, 'Plastic'),
    ('4d5e6f','음식 포장 시 다회용기 사용하기', '다회용기를 사용하면 일회용 플라스틱 용기 사용을 줄일 수 있습니다.', 10, 'Plastic'),
    ('7g8h9i','텀블러나 머그컵 사용하기', '텀블러를 사용하면 일회용 컵의 사용을 줄일 수 있습니다.', 20, 'Plastic'),
    ('jklmno','플라스틱 빨대 안 쓰기', '빨대를 사용하지 않으면 플라스틱 사용을 줄 일수 있습니다.', 20, 'Plastic'),
    ('pqrstu','플라스틱 세척해서 분리배출하기', 'Turn off lights and unplug electronics when not in use.', 30, 'Plastic'),
    ('pq12td','무라벨 제품 구매하기', '라벨이 없는 제품을 구매하면, 플라스틱 제품을 더 쉽게 재활용할 수 있습니다.', 30, 'Plastic');

-- Sample data for 'users' table
INSERT INTO users (user_id, username, email, password, level) 
VALUES
    ('123abc', 'user1', 'user1@example.com', 'password1', 3),
    ('456def', 'user2', 'user2@example.com', 'password2', 2),
    ('789ghi', 'user3', 'user3@example.com', 'password3', 1),
    ('abc123', 'user4', 'user4@example.com', 'password4', 4),
    ('def456', 'user5', 'user5@example.com', 'password5', 2);

-- Sample data for 'fulfilled_habits' table
INSERT INTO fulfilled_habits (fulfilled_habit_id, user_id, habit_id, date) 
VALUES
    ('fh1', '123abc', '1a2b3c', '2023-11-15'),
    ('fh2', '123abc', '4d5e6f', '2023-11-15'),
    ('fh3', '123abc', '4d5e6f', '2023-11-16'),
    ('fh4', '456def', '4d5e6f', '2023-11-16'),
    ('fh5', '789ghi', '7g8h9i', '2023-11-15'),
    ('fh6', 'abc123', 'jklmno', '2023-11-17'),
    ('fh7', 'def456', 'pqrstu', '2023-11-16'),
    ('fh8', '123abc', '1a2b3c', '2023-11-30');

-- Sample data for 'planned_habits' table
INSERT INTO planned_habits (planned_habit_id, user_id, habit_id, start_date, end_date) 
VALUES
    ('ph1', '123abc', '1a2b3c', '2023-11-01', '2023-11-30'),
    ('ph2', '123abc', '4d5e6f', '2023-11-01', '2023-11-30'),
    ('ph3', '456def', '4d5e6f', '2023-11-02', '2023-12-01'),
    ('ph4', '789ghi', '7g8h9i', '2023-11-01', '2023-11-30'),
    ('ph5', 'abc123', 'jklmno', '2023-11-01', '2023-11-30'),
    ('ph6', 'def456', 'pqrstu', '2023-10-31', '2023-11-29');
