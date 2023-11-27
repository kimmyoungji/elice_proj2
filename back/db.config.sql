CREATE DATABASE turtine; 

USE turtine;

CREATE TABLE habits (
    habit_id VARCHAR(36) PRIMARY KEY,
    habit_title VARCHAR(50) NOT NULL,
    trash_type VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    passowrd VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL
);

CREATE TABLE fullfilled_habits (
    fullfilled_habit_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    habit_id VARCHAR(36) NOT NULL,
    fullfilled_time DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id)
);

CREATE TABLE planned_habits (
    planned_habit_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    habit_id VARCHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id)
);


-- Insert data into 'habits' table
INSERT INTO habits (habit_id, habit_title, trash_type) VALUES
  ('1a2b3c4d5e', 'Recycling Paper', 'Paper'),
  ('2b3c4d5e6f', 'Composting', 'Organic'),
  ('3c4d5e6f7g', 'Reducing Plastic Use', 'Plastic'),
  ('4d5e6f7g8h', 'Saving Energy', 'General'),
  ('5e6f7g8h9i', 'Water Conservation', 'Water'),
  ('6f7g8h9i0j', 'Walking or Cycling', 'None'),
  ('7g8h9i0j1k', 'Eating Local Produce', 'Organic'),
  ('8h9i0j1k2l', 'Volunteering for Cleanup', 'General'),
  ('9i0j1k2l3m', 'Turning Off Lights', 'Energy'),
  ('0j1k2l3m4n', 'Using Reusable Bags', 'Plastic');

-- Insert data into 'users' table
INSERT INTO users (user_id, username, email, birth_date) VALUES
  ('a1b2c3d4e5', 'user1', 'user1@example.com', '1995-03-15'),
  ('b2c3d4e5f6', 'user2', 'user2@example.com', '1988-09-22'),
  ('c3d4e5f6g7', 'user3', 'user3@example.com', '1992-06-10'),
  ('d4e5f6g7h8', 'user4', 'user4@example.com', '1998-12-01'),
  ('e5f6g7h8i9', 'user5', 'user5@example.com', '1985-07-28');

-- Insert data into 'fullfilled_habits' table
INSERT INTO fullfilled_habits (fullfilled_habit_id, user_id, habit_id, fullfilled_time) VALUES
  ('001', 'a1b2c3d4e5', '1a2b3c4d5e', '2023-01-10 08:30:00'),
  ('002', 'b2c3d4e5f6', '2b3c4d5e6f', '2023-01-11 12:45:00'),
  ('003', 'c3d4e5f6g7', '3c4d5e6f7g', '2023-01-12 17:20:00'),
  ('004', 'a1b2c3d4e5', '1a2b3c4d5e', '2023-01-10 08:30:00'),
  ('005', 'b2c3d4e5f6', '2b3c4d5e6f', '2023-01-11 12:45:00'),
  ('006', 'c3d4e5f6g7', '3c4d5e6f7g', '2023-01-12 17:20:00'),
  ('007', 'a1b2c3d4e5', '1a2b3c4d5e', '2023-01-10 08:30:00'),
  ('008', 'b2c3d4e5f6', '2b3c4d5e6f', '2023-01-11 12:45:00'),
  ('009', 'c3d4e5f6g7', '3c4d5e6f7g', '2023-01-12 17:20:00');

-- Insert data into 'planned_habits' table
INSERT INTO planned_habits (planned_habit_id, user_id, habit_id, start_date, end_date) VALUES
  ('p001', 'd4e5f6g7h8', '1a2b3c4d5e', '2023-02-01', '2023-02-28'),
  ('p002', 'e5f6g7h8i9', '1a2b3c4d5e', '2023-02-15', '2023-03-15'),
  ('p003', 'd4e5f6g7h8', '4d5e6f7g8h', '2023-02-01', '2023-02-28'),
  ('p004', 'a1b2c3d4e5', '5e6f7g8h9i', '2023-02-15', '2023-03-15'),
  ('p005', 'd4e5f6g7h8', '4d5e6f7g8h', '2023-02-01', '2023-02-28'),
  ('p006', 'a1b2c3d4e5', '5e6f7g8h9i', '2023-02-15', '2023-03-15');