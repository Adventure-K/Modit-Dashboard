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
	"state" VARCHAR(50),
	"zip" INT
	"rh_id" INT REFERENCES "user" -- user ID of institution's research head. Used only to display on the institution list.
);

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255),
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"inst_id" INT REFERENCES "institution", -- Meant to assign clinicians and researchers to an institution
	"user_level" INT, -- 0: clinician; 1: researcher' 2: research head; 3: admin
	"is_approved" BOOLEAN DEFAULT false,
	"researcher_id" INT REFERENCES "user", -- Meant to assign clinicians to a given researcher
	"is_active" BOOLEAN DEFAULT true
);

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
	"id" SERIAL PRIMARY KEY,
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
		('Neurotype', '1234 Main St', 'Minneapolis', 'MN', '55404')
;

INSERT INTO "user" ("username", "first_name", "last_name", "inst_id", "user_level", "is_approved", "is_active")
VALUES 	('loblaw@loblaw.law', 'Bob', 'Loblaw', '1', '1', TRUE, TRUE),
		('stan@mntc.fake', 'Stan', 'Jones', '2', '0', TRUE, TRUE),
		('admin@ad.min', 'Scott', 'Admin', '3', '3', TRUE, TRUE),
		('authority@mntc.fake',	'Beverly', 'Star', '2',	'2', FALSE,	TRUE),
		('researchhead@loblaw.law',	'Dave',	'Loblaw', '1',	'2', FALSE,	TRUE),
		('level2@zds.com', 'Jamie', 'Wilson', '3', '2',	FALSE, TRUE),
		('Barryb@axios.net', 'John', 'Spartan',	'3', '2', FALSE, TRUE),
		('akane', 'King of', 'All Cosmos', '3',	'3', TRUE,	TRUE);
		
INSERT INTO "patient" ("modit_id", "clinician_id", "first_name", "last_name", "email", "is_active")
VALUES 	('12345', '1', 'Mary', 'Mallon', 'marymallon@gmail.fake', true),
		('12346', '1', 'Tom', 'Hanks', 'th@p2p.net', true),
		('12347', '1', 'Jimbo', 'Frank', 'therehegoes@yahoo.com', true),
		('12348', '1', 'Rip', 'Torn', 'mibceo@mib.gov', true),
		('12349', '1', 'Bill', 'Musk', 'archtroll@forbes.fake', true);

INSERT INTO "session" ("modit_id", "proportionOfGazeTimeOnDrugs", "proportionOfGazeTimeOnNonDrugs", "proportionOfGazeTimeOnBack", "proportionOfGazeTimeOnDrugsNoBack", "proportionOfGazeTimeOnNonDrugsNoBack")
VALUES 	('12345', '0.20', '0.20', '0.60', '0.50', '0.50'),
		('12346', '0.75', '0.15', '0.10', '0.83', '0.17'),
		('12347', '0.66', '0.29', '0.05', '0.69', '0.31'),
		('12348', '0.55', '0.20', '0.25', '0.73', '0.27'),
		('12349', '0.80', '0.10', '0.10', '0.89', '0.11');