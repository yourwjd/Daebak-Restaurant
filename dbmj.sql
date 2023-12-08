use dbmj; 
select * from dbmj.joins; 
select * from dbmj.users; 
select * from dbmj.likes; 
select * from dbmj.reservations; 
select * from dbmj.games; 

drop database dbmj;
create database dbmj;

show tables;
SHOW CREATE TABLE joins;
SHOW CREATE TABLE users;
SHOW CREATE TABLE likes;
SHOW CREATE TABLE reservations;
SHOW CREATE TABLE games;

table dbmj.joins;
table dbmj.users;
table dbmj.likes;
table dbmj.reservations;
table dbmj.games;

drop table dbmj.joins; -- table 지우기
drop table dbmj.users; -- table 지우기
drop table dbmj.likes; -- table 지우기
drop table dbmj.reservations; -- table 지우기
drop table dbmj.games; -- table 지우기


insert into dbmj.joins (id, password, nick) values('yourwjd13', '021013', '양유정');

INSERT INTO dbmj.users (comment, name, created_at) VALUES ('피자에그 합쳐서 피그', '꿀꿀', CURDATE());

insert into dbmj.likes (liked) values(1);
insert into dbmj.likes (liked) values(0);

insert into dbmj.reservations (name, phone_number, people_number, order_date, comment) values('양유정', '010-1111-2222', '2', '2023-11-02', '매운 거 잘 못 먹어요');

INSERT INTO dbmj.games (msg, UserId, GoodId) VALUES ('내가 먹고싶어요', 1, 1);


ALTER TABLE dbmj.users MODIFY created_at DATE;
ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_1;


CREATE TABLE dbmj.joins (
id INT NOT NULL AUTO_INCREMENT,
password varchar(100) not NULL,
nick varchar(15) NOT NULL,
createdAt datetime not null default now(),
updatedAt datetime not null default now(),
deletedAt datetime not null default now(),
primary key(id))
comment='회원'
DEFAULT CHARSET=UTF8mb4;

CREATE TABLE dbmj.events (
id INT NOT NULL AUTO_INCREMENT,
comment text null,
name varchar(5) NOT NULL,
created_at DATE,
primary key(id),
index name_idx (name desc) visible)
comment='이벤트'
DEFAULT CHARSET=UTF8mb4;

CREATE TABLE dbmj.likes (
id INT NOT NULL AUTO_INCREMENT,
primary key(id),
liked tinyint(1) not null)
comment='좋아요'
DEFAULT CHARSET=UTF8mb4;

CREATE TABLE dbmj.reservations (
id INT NOT NULL AUTO_INCREMENT,
name varchar(5) NOT NULL,
phone_number varchar(13) NOT NULL,
people_number varchar(2) NOT NULL,
order_date date NOT NULL,
primary key(id),
comment text null)
comment='예약하기'
DEFAULT CHARSET=UTF8mb4;

CREATE TABLE dbmj.games (
id INT NOT NULL AUTO_INCREMENT,
msg varchar(100) default null,
createdAt datetime not null default now(),
updatedAt datetime not null default now(),
deletedAt datetime not null default now(),
UserId int(11) DEFAULT NULL,
GoodId int(11) DEFAULT NULL,
PRIMARY KEY (id),
FOREIGN KEY (UserId) REFERENCES users (id),
FOREIGN KEY (GoodId) REFERENCES goods (id))
comment='게임'
DEFAULT CHARSET=UTF8mb4;

