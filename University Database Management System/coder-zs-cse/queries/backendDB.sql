CREATE DATABASE UniversityManagementSystem;

show databases;

USE UniversityManagementSystem;

CREATE TABLE login(
username VARCHAR(25),
password VARCHAR(25)
);

INSERT INTO login

VALUES ('admin', '12345');

SELECT * FROM login;
drop table student;
create table student (
name varchar(25),
rollNo varchar(10),
fathersName varchar(25),
mothersName varchar(25),
dob varchar(20),
gender varchar(10),
degree varchar(10),
branch varchar(10),
address varchar(100),
phoneNumber integer,
email varchar(40)
);

select * from student;