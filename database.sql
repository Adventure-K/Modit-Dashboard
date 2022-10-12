-- USER and SESSION are reserved keywords in Postgres
-- You MUST use double quotes in every query that they are in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE DATABASE "neurotype_modit_dashboard";

-- CREATE TABLES IN THIS ORDER --

CREATE TABLE "institution" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"street_address" VARCHAR(255),
	"city" VARCHAR(255),
	"state" VARCHAR(20),
	"zip" INT
);

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) UNIQUE NOT NULL,
	"password" VARCHAR(255),
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"inst_id" INT REFERENCES "institution", -- Meant to assign clinicians and researchers to an institution
	"user_level" INT, -- 0: clinician; 1: researcher' 2: research head; 3: admin
	"is_approved" BOOLEAN DEFAULT false,
	"researcher_id" INT REFERENCES "user", -- Meant to assign clinicians to a given researcher
	"is_active" BOOLEAN DEFAULT true
);

ALTER TABLE "institution" ADD COLUMN "rh_id" INT REFERENCES "user";
-- user ID of institution's research head. Used only to display on the institution list.

CREATE TABLE "patient" (
	"id" SERIAL PRIMARY KEY,
	"modit_id" INT UNIQUE, -- Clinician should input this manually to match the react native app user ID
	"clinician_id" INT REFERENCES "user",
	"first_name" VARCHAR(255),
	"last_name" VARCHAR(255),
	"email" VARCHAR(255),
	"is_active" BOOLEAN DEFAULT true
);

CREATE TABLE "session" (
	"session_id" SERIAL PRIMARY KEY,
	"modit_id" INT NOT NULL REFERENCES "patient" (modit_id), -- Links to "patient".modit_id
	"proportionOfGazeTimeOnDrugs" NUMERIC(3, 2),
	"proportionOfGazeTimeOnNonDrugs" NUMERIC(3, 2),
	"proportionOfGazeTimeOnBack" NUMERIC(3, 2),
	"proportionOfGazeTimeOnDrugsNoBack" NUMERIC(3, 2),
	"proportionOfGazeTimeOnNonDrugsNoBack" NUMERIC(3, 2)
);

INSERT INTO "institution" ("name", "street_address", "city", "state", "zip")
VALUES 	('Hazelden Betty Ford Foundation', '15251 Pleasant Valley Road', 'Center City', 'MN', '55102'),
		('Minnesota Adult & Teen Challenge', '740 E 24th St', 'Minneapolis', 'MN', '55404'),
		('Hennepin Healthcare', '701 Park Ave', 'Minneapolis', 'MN', '55415');

INSERT INTO "user" ("username", "first_name", "last_name", "inst_id", "user_level", "is_approved", "is_active")
VALUES 	('jr1021@gmail.com', 'John', 'Rowles', '1', '2', TRUE, TRUE),
		('stanjones@hotmail.com', 'Stan', 'Ryan', '2', '2', TRUE, TRUE),
		('research@hcmc.net', 'Sally', 'Rodriguez', '3', '1', TRUE, TRUE),
		('lab3@hbff.org', 'Mike', 'Charles', '1', '0', TRUE, TRUE),
		('sue001@mntc.org',	'Sue', 'Christensen', '2', '0', TRUE, TRUE),
		('level2@zds.com', 'Jamie', 'Cox', '3', '0',FALSE, TRUE),
		('logan@yahoo.net', 'Logan', 'Ricks', '1', '1', TRUE, TRUE),
		('admin@neurotype.io', 'Scott', 'Burwell', NULL, '3', TRUE,	TRUE);
		
-- Go into institution table. Set rh_id of #1 to '1' and of #2 to '2' --
		
INSERT INTO "patient" ("modit_id", "clinician_id", "first_name", "last_name", "email", "is_active")
VALUES 	('12345', '4', 'Bob', 'Loblaw', 'lawblog@gmail.com', true),
		('12346', '4', 'Tom', 'Hammond', 'th@p2p.net', true),
		('12347', '5', 'Jim', 'Frank', 'therehegoes@yahoo.com', true),
		('12348', '5', 'Rip', 'Torn', 'mibceo@mib.gov', true),
		('12349', '6', 'Bill', 'Margrave', 'archbill@yahoo.com', true),
		('12350', '6', 'Hank', 'Jones', 'hankeye@hotmail.com', true);

INSERT INTO "session" ("modit_id", "proportionOfGazeTimeOnDrugs", "proportionOfGazeTimeOnNonDrugs", "proportionOfGazeTimeOnBack", "proportionOfGazeTimeOnDrugsNoBack", "proportionOfGazeTimeOnNonDrugsNoBack")
VALUES 	('12345', '0.20', '0.20', '0.60', '0.50', '0.50'),
		('12345', '0.35', '0.50', '0.15', '0.41', '0.59'),
		('12346', '0.75', '0.15', '0.10', '0.83', '0.17'),
		('12346', '0.50', '0.40', '0.10', '0.56', '0.44'),
		('12347', '0.20', '0.20', '0.60', '0.50', '0.50'),
		('12347', '0.66', '0.29', '0.05', '0.69', '0.31'),
		('12348', '0.55', '0.20', '0.25', '0.73', '0.27'),
		('12348', '0.75', '0.15', '0.10', '0.83', '0.17'),
		('12349', '0.50', '0.40', '0.10', '0.56', '0.44'),
		('12349', '0.80', '0.10', '0.10', '0.89', '0.11'),
		('12350', '0.20', '0.20', '0.60', '0.50', '0.50'),
		('12350', '0.80', '0.10', '0.10', '0.89', '0.11')
;