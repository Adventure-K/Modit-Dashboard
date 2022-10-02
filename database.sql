-- USER and SESSION are reserved keywords in Postgres
-- You MUST use double quotes in every query that they are in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255),
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"inst_id" INT REFERENCES "institution",
	"user_level" INT
);

CREATE TABLE "patient" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(255),
	"clinician_id" INT REFERENCES "user",
	"first_name" VARCHAR(255),
	"last_name" VARCHAR(255)
);

CREATE TABLE "session" (
	"id" SERIAL PRIMARY KEY,
	"patient_id" INT NOT NULL REFERENCES "patient",
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

CREATE TABLE "institution" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"street_address" VARCHAR(255),
	"city" VARCHAR(255),
	"state" VARCHAR(2),
	"zip" INT;
);

INSERT INTO "institution" ("name", "street_address", "city", "state", "zip")
VALUES 	('Hazelden Betty Ford Foundation', '15251 Pleasant Valley Road', 'Center City', 'MN', '55102'),
		('Minnesota Adult & Teen Challenge', '740 E 24th St', 'Minneapolis', 'MN', '55404'),
		('Neurotype');


INSERT INTO "user" ("username", "first_name", "last_name", "inst_id", "user_level")
VALUES 	('loblaw@loblaw.law', 'Bob', 'Loblaw', '1', '1'),
		('stan@mntc.fake', 'Stan', 'Jones', '2', '0'),
		('admin@ad.min', 'Scott', 'Admin', '3', '3');
		
INSERT INTO "patient" ("username", "clinician_id", "first_name", "last_name")
VALUES ('patient_zero', '1', 'Mary', 'Smith');