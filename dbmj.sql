use dbmj; 
select * from dbmj.users; 
select * from dbmj.likes; 
select * from dbmj.reservations; 

drop database dbmj;
create database dbmj;

show tables;
SHOW CREATE TABLE comments;

table dbmj.users;
table dbmj.likes;
table dbmj.reservations;
drop table dbmj.users; -- table 지우기
drop table dbmj.likes; -- table 지우기
drop table dbmj.reservations; -- table 지우기

INSERT INTO dbmj.users (comment, name, created_at) VALUES ('피자에그 합쳐서 피그', '꿀꿀', CURDATE());

insert into dbmj.likes (liked) values(1);
insert into dbmj.likes (liked) values(0);

insert into dbmj.reservations (name, phone_number, people_number, order_date, comment) values('양유정', '010-1111-2222', '2', '2023-11-02', '매운 거 잘 못 먹어요');

ALTER TABLE dbmj.users MODIFY created_at DATE;
ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_1;

CREATE TABLE dbmj.users (
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
