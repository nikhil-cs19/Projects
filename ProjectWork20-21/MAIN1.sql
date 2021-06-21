create database project_work;
use project_work;


-- STUDENT TABLE
create table student(
	student_id int auto_increment,
	FirstName varchar(30),
	LastName varchar(30),
	DOB date,
	Gender varchar(7),
	mobile_no bigint,
	Email varchar(45),
	Nationality varchar(40),
	blood_group varchar(4),
	Relegion varchar(16),
	Category varchar(15),
	Adhar_no bigint,
	primary key(student_id)
);
desc student;



-- Academic details table
create table Academic_Details(
	student_id int,
	MOA varchar(15),
	branch varchar(150),
	c10_BoardName varchar(200),
	c10_YOP int,
	c10_perecentage float4,
	c12_BoardName varchar(200),
	c12_YOP int,
	c12_perecentage float4,
	foreign key(student_id) references student(student_id) on delete cascade
);
desc Academic_Details;


-- Address table
create table Address(
	student_id int,
	pres_lane text,
	pres_pincode int,
	pres_district varchar(60),
	pres_state varchar(40),
	per_lane text,
	per_pincode int,
	per_district varchar(60),
	per_state varchar(40),
	foreign key(student_id) references student(student_id) on delete cascade
);
desc Address;



-- Family table
create table Family(
	student_id int,
    Relationship varchar(10),
	Name_ varchar(50),
	DOB date,
	mobile_no bigint,
	Qualification varchar(30),
	Occupation varchar(30),
	Email varchar(45),
	primary key(mobile_no),
	foreign key(student_id) references student(student_id) on delete cascade
);
desc Family;
show tables;

--  drop database project_work;
select * from signup; 
 select * from student;
 select * from academic_details;
--  select * from family;
--  select * from address;
 
 create table signup(
 Email varchar(70) primary key,
 FirstName varchar(30),
 LastName varchar(30),
 password_ varchar(36),
 student_id int,
 foreign key (student_id) references student(student_id) on delete cascade
 );
 
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();

 
insert into academic_details(student_id,branch)values(1,"Computer Science and Engineering");
insert into academic_details(student_id,branch)values(2,"Mechanical Engineering");
insert into academic_details(student_id,branch)values(3,"Information Science");
insert into academic_details(student_id,branch)values(4,"Electronics and communication Enginnering");
insert into academic_details(student_id,branch)values(5,"Civil Engineering");

select *from academic_details;


insert into signup values("nikhils.cs19@bmsce.ac.in","Nikhil","S","",1);
insert into signup values("kiranb.me17@bmsce.ac.in","Kiran","B","",2);
insert into signup values("arunk.is19@bmsce.ac.in","Arun","kumar K","",3);
insert into signup values("anil.ec20@bmsce.ac.in","Anil","M","",4);
insert into signup values("shashikantm.cv19@bmsce.ac.in","Shashikant","singh M","",5);


select *from signup;

/*
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();
insert into academic_details(student_id,branch)values(6,"Biotechnology");
insert into academic_details(student_id,branch)values(7,"Metalurgical Engineering");
insert into academic_details(student_id,branch)values(8,"Information Science");
insert into academic_details(student_id,branch)values(9,"Mechanical Engineering");
insert into academic_details(student_id,branch)values(10,"Computer Science and Engineering");
insert into signup values("premag.bt19@bmsce.ac.in","Prema","G","",6);
insert into signup values("prajwals.mt19@bmsce.ac.in","Prajwal","V S","",7);
insert into signup values("nitishm.is19@bmsce.ac.in","Nitish","kumar M","",8);
insert into signup values("premsai.me19@bmsce.ac.in","Prem","p sai","",9);
insert into signup values("harsha.cs20@bmsce.ac.in","Harsha","V N","",10);
*/
/*
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();
insert into student()values();

insert into academic_details(student_id,branch)values(11,"Civil Engineering");
insert into academic_details(student_id,branch)values(12,"Electronics and communication Enginnering");
insert into academic_details(student_id,branch)values(13,"Biotechnology");
insert into academic_details(student_id,branch)values(14,"Metalurgical Engineering");
insert into academic_details(student_id,branch)values(15,"Computer Science and Engineering");



insert into signup values("gagana.cv18@bmsce.ac.in","Gagana","D K","",11);
insert into signup values("aishwarya.ec19@bmsce.ac.in","Aishwarya","nagraj","",12);
insert into signup values("nitin.bt17@bmsce.ac.in","nitin","Dulloli","",13);
insert into signup values("mallikaprasad.mt18@bmsce.ac.in","Mallika","prasad","",14);
insert into signup values("darshanm.cs19@bmsce.ac.in","Darshan","M S","",15);
*/