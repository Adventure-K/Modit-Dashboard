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
	"state" VARCHAR(2),
	"zip" INT
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
	"researcher_id" INT REFERENCES "user" -- Meant to assign clinicians to a given researcher
);

CREATE TABLE "patient" (
	"id" SERIAL PRIMARY KEY,
	"modit_id" INT, -- Clinician should input this manually to match the react native app user ID
	"clinician_id" INT REFERENCES "user",
	"first_name" VARCHAR(255),
	"last_name" VARCHAR(255),
	"email" VARCHAR(255),
	"is_active" BOOLEAN DEFAULT true
);

CREATE TABLE "session" (
	"id" SERIAL PRIMARY KEY,
	"modit_id" INT NOT NULL REFERENCES "patient", -- Will link to "patient".modit_id
	"category" INT,
	"timestamp" VARCHAR(50) NOT NULL,
	"apertureData" TEXT
);

CREATE TABLE "session_data" (
	"id" SERIAL PRIMARY KEY,
	"session_id" INT NOT NULL REFERENCES "session",
	"proportionOfGazeTimeOnDrugs" INT NOT NULL,
	"proportionOfGazeTimeOnNonDrugs" INT NOT NULL,
	"proportionOfGazeTimeOnBack" INT NOT NULL,
	"proportionOfGazeTimeOnDrugsNoBack" INT NOT NULL,
	"proportionOfGazeTimeOnNonDrugsNoBack" INT NOT NULL
);

INSERT INTO "institution" ("name", "street_address", "city", "state", "zip")
VALUES 	('Hazelden Betty Ford Foundation', '15251 Pleasant Valley Road', 'Center City', 'MN', '55102'),
		('Minnesota Adult & Teen Challenge', '740 E 24th St', 'Minneapolis', 'MN', '55404'),
		('Neurotype', '1234 Main St', 'Minneapolis', 'MN', '55404')
;

INSERT INTO "user" ("username", "first_name", "last_name", "inst_id", "user_level", "researcher_id")
VALUES 	('loblaw@loblaw.law', 'Bob', 'Loblaw', '1', '1', null),
		('stan@mntc.fake', 'Stan', 'Jones', '2', '0', '1'),
		('admin@ad.min', 'Scott', 'Admin', '3', '3', null);
		
INSERT INTO "patient" ("modit_id", "clinician_id", "first_name", "last_name", "email")
VALUES ('12345', '1', 'Mary', 'Mallon', 'marymallon@gmail.fake');