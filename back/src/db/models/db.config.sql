CREATE DATABASE turtine; 

USE turtine;

CREATE TABLE habits (
    habit_id VARCHAR(100) PRIMARY KEY ,
    habit_title VARCHAR(50) NOT NULL,
    discription VARCHAR(300),
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
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE planned_habits (
    planned_habit_id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    habit_id VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- UUID() 사용이전
INSERT INTO habits (habit_id, habit_title, discription, trash_type) 
VALUES
    ('habit1','장바구니 (에코백) 사용하기', '장바구니를 사용하면 일회용 비닐봉투의 사용을 줄일 수 있습니다.','Plastic'),
    ('habit2','음식 포장 시 다회용기 사용하기', '다회용기를 사용하면 일회용 플라스틱 용기 사용을 줄일 수 있습니다.','Plastic'),
    ('habit3','텀블러나 머그컵 사용하기', '텀블러를 사용하면 일회용 컵의 사용을 줄일 수 있습니다.', 'Plastic'),
    ('habit4','플라스틱 빨대 안 쓰기', '빨대를 사용하지 않으면 플라스틱 사용을 줄 일수 있습니다.', 'Plastic'),
    ('habit5','플라스틱 세척해서 분리배출하기', '플라스틱을 세척해서 분리배출하면, 재활용 가능성이 높아집니다.', 'Plastic'),
    ('habit6','무라벨 제품 구매하기', '라벨이 없는 제품을 구매하면, 플라스틱 제품을 더 쉽게 재활용할 수 있습니다.', 'Plastic');

-- Sample data for 'users' table
INSERT INTO users (user_id, username, email, password, level) 
VALUES
    ('123abc', 'user1', 'user1@example.com', 'password1', 3),
    ('456def', 'user2', 'user2@example.com', 'password2', 2),
    ('789ghi', 'user3', 'user3@example.com', 'password3', 1),
    ('abc123', 'user4', 'user4@example.com', 'password4', 4),
    ('def456', 'user5', 'user5@example.com', 'password5', 2);

INSERT INTO users (user_id, username, email, password, level)
VALUES
    ('ghi789', 'user6', 'user6@example.com', 'password6', 3),
    ('jkl012', 'user7', 'user7@example.com', 'password7', 1),
    ('mno345', 'user8', 'user8@example.com', 'password8', 4),
    ('pqr678', 'user9', 'user9@example.com', 'password9', 2),
    ('stu901', 'user10', 'user10@example.com', 'password10', 3),
    ('vwx234', 'user11', 'user11@example.com', 'password11', 1),
    ('yzab567', 'user12', 'user12@example.com', 'password12', 4),
    ('cde890', 'user13', 'user13@example.com', 'password13', 5),
    ('fgh123', 'user14', 'user14@example.com', 'password14', 3),
    ('ijk456', 'user15', 'user15@example.com', 'password15', 1),
    ('lmn789', 'user16', 'user16@example.com', 'password16', 4),
    ('opq012', 'user17', 'user17@example.com', 'password17', 5),
    ('rst345', 'user18', 'user18@example.com', 'password18', 3),
    ('opq013', 'user19', 'user19@example.com', 'password19', 2),
    ('rst346', 'user20', 'user20@example.com', 'password20', 3);

INSERT INTO fulfilled_habits (fulfilled_habit_id, user_id, habit_id, date) 
VALUES
    ('fh1', '123abc', 'habit1', '2023-01-05'),
    ('fh2', '456def', 'habit2', '2023-01-10'),
    ('fh3', '789ghi', 'habit3', '2023-01-15'),
    ('fh4', 'abc123', 'habit4', '2023-01-20'),
    ('fh5', 'def456', 'habit5', '2023-01-25'),
    ('fh6', '123abc', 'habit1', '2023-01-28'),
    ('fh7', '456def', 'habit2', '2023-02-02'),
    ('fh8', '789ghi', 'habit3', '2023-02-07');

-- Sample data for 'planned_habits' table
INSERT INTO planned_habits (planned_habit_id, user_id, habit_id, start_date, end_date) 
VALUES
    ('ph1', '123abc', 'habit1', '2023-02-01', '2023-02-10'),
    ('ph2', '456def', 'habit2', '2023-02-05', '2023-02-15'),
    ('ph3', '789ghi', 'habit3', '2023-02-10', '2023-02-20'),
    ('ph4', 'abc123', 'habit4', '2023-02-15', '2023-02-25'),
    ('ph5', 'def456', 'habit5', '2023-02-20', '2023-03-01'),
    ('ph6', '123abc', 'habit1', '2023-03-05', '2023-03-15'),
    ('ph7', '456def', 'habit2', '2023-03-10', '2023-03-20'),
    ('ph8', '789ghi', 'habit3', '2023-03-15', '2023-03-25');

CREATE TABLE intro(data VARCHAR(1210));
INSERT INTO intro VALUES('{
"koreaTrashGraph":
[{"year":2017,"recycle_amount":2285.1,"burn_or_bury_amount":3546.9},
{"year":2018,"recycle_amount":2521.9,"burn_or_bury_amount":3752.8},{"year":2019,"recycle_amount":2604.3,"burn_or_bury_amount":4416.5},
{"year":2020,"recycle_amount":3119.7363387978144,"burn_or_bury_amount":4423.960928961748},
{"year":2021,"recycle_amount":3128.7342465753422,"burn_or_bury_amount":4530.461643835616}],
"worldOceanPlasticsGraph":
[{"year":2000,"total_amount":8.471748},{"year":2001,"total_amount":9.153952},
{"year":2002,"total_amount":9.881777},{"year":2003,"total_amount":10.656836},
{"year":2004,"total_amount":11.48184},{"year":2005,"total_amount":12.356893},
{"year":2006,"total_amount":13.285542},{"year":2007,"total_amount":14.270018},
{"year":2008,"total_amount":15.304404},{"year":2009,"total_amount":16.390133},
{"year":2010,"total_amount":17.532563},{"year":2011,"total_amount":18.731689},
{"year":2012,"total_amount":19.986928},{"year":2013,"total_amount":21.299929},
{"year":2014,"total_amount":22.671211},{"year":2015,"total_amount":24.102793},
{"year":2016,"total_amount":25.592507},{"year":2017,"total_amount":27.140495},
{"year":2018,"total_amount":28.747704},{"year":2019,"total_amount":30.408747}]}');