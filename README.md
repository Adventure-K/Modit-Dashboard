# Modit_Dasboard

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
    

## Description

The Modit Dashboard is a companion application to Neurotype Inc's Modit Mobile application.  The dashboard is a hub to access the data collected from the mobile application userin order to provide a visualized chart of that data. The data is then used by research/clinic professionals to evaluate triggers and prescribe the most effective therapies to address issues of substance abuse and addiction. Data in it's raw form can be exported as well for use in other research analysis. The dashboard is developed with different levels of users that have varying degrees of access to patient/participant data and information. This application was developed for use by Neurotype Inc. which is a research organization specializing in R&D for substance abuse and addiction.

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://www.tailwindcss.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-plain.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
<a href="https://chartjs.org/"><img src="/chart-js-logos-idg4l58CuH.svg" height="40px" width="40px" /></a>
## Getting Started

This project should be able to run in your favorite IDE. Our team used VS code while building it. 
<a href="https://code.visualstudio.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>

### Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/) - our database queries are written in SQL and we used PostgreSQL

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type...  `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7.  Create a `.env` file at the root of the project and paste this line into the file and change "superDuperSecret" to any random value: `SERVER_SESSION_SECRET=superDuperSecret`
8. Create a database named `neurotype_modit_dashboard` in PostgresSQL
If you would like to name your database something else, you will need to change `neurotype_modit_dashboard` to the name of your new database name in `server/modules/pool.js`
9. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a dummy data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
10. Run `npm run server` in your VS Code terminal
11. Open a second terminal and run `npm run client`

## Usage

Once everything is installed and running it should open in your default browser - if not, navigate to http://localhost:3000/#/.

Video walkthrough of application usage: https://youtu.be/HhJHQm0KJKw

## Deployment
- Login Credentials for Heroku have been provided in the hand off document.
- If you need make changes you wish to push to the deployed app, you must login, go into the warm-thicket-00133 (this is the generated name by Heroku) deployment, go to the deploy tab, and then follow instructions for logging in to Heroku through the terminal to be able to push to Heroku.
- Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button
- To set up the DB, we used Postico, just plug the information from Heroku into a new favorite. The Information for this can be found in the Resources tab, by clicking the Postgres add on. From there it will bring you to a new page where you will go into the settings tab and click view credentials. 