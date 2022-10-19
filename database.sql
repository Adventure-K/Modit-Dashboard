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

CREATE TABLE "session" ( -- Matches format of ABmap.py output
	"session_id" SERIAL PRIMARY KEY,
	"modit_id" INT NOT NULL REFERENCES "patient" (modit_id), -- Links to "patient".modit_id
	"proportionOfGazeTimeOnDrugs" NUMERIC(3, 2),
	"proportionOfGazeTimeOnNonDrugs" NUMERIC(3, 2),
	"proportionOfGazeTimeOnBack" NUMERIC(3, 2),
	"proportionOfGazeTimeOnDrugsNoBack" NUMERIC(3, 2),
	"proportionOfGazeTimeOnNonDrugsNoBack" NUMERIC(3, 2)
);