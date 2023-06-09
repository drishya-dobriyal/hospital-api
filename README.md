# hospital-api
Create an API for Hospital API 

## Installation
For running this app in your system, you will be needing:
Mongodb and Node in your system.

For Installing the project you can start by :
Initalizing Variables in env
npm install
npm start
run it in browser using "http://localhost:8000/"

## Technologies used:
* Node js for backend
* MongoDB with mongoose as Database

## Folder Structure
* index.js - entry point for the project
* routes - Folder for Router assignment for each handler
* models - Folder for Schemas Used 
* controllers - Folder for controllers for each router
* config - Folder for config files

- Register doctor
        - URL : http://localhost:8000/doctors/register
       - Method : POST
       - Parameters : username and password
- Login doctor
       - URL : http://localhost:8000/doctors/login
       - Method : POST
       - Parameters : username and password
 - Regiter Patient
       - URL : http://localhost:8000/patients/register
       - Method : POST
       - Parameters : phone_number
 - Create Repost
       - URL : http://localhost:8000/patients/:id/create_report
       - Method : POST
       - Parameters : status
       - Authorization(Bearer) : send JWT token received by doctor login
 - Fetch Report of patient
       - URL : http://localhost:8000/patients/:id/all_reports
       - Method : Get
 - Fetch Report by Status
       - URL : http://localhost:8000/reports/:status
       - Method : Get
