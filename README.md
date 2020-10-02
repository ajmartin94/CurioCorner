# CurioCorner
SEI Project 2

## Project Description
A community app designed to share hobbies and DIY projects. App will be made using NodeJS, Express, Embedded JavaScript, CSS, and deployed on Heroku, available to the public. The app will contain features that allow for users to create posts that detail their DIY projects and allow other users to interact with the posts. The app will allow users to create accounts, save account information in a database, and have authentication and authorization features.  


## Technology Used
- NodeJS, Express, Sequelize, PostGres
- Embedded JavaScript, CSS, and CSS frameworks


## User Stories
- As a user, I want to create a secure account so that I can post my projects. 
- As a user, I want to create a secure account so that I can interact with others' projects. 
- As a user, I want to sort the projects so that I can find what I am interested in. 
- As a user, I want to upload pictures to my projects so that others can see my project details. 
- As an unregistered user, I want to be able to use the site and see projects so that I can be inspired to do them on my own. 


## ERD
!['CurioCorner ERD Pic'](https://i.imgur.com/RzbHREC.jpg)

## Wireframes
### Home page
!['Home page wireframe'](https://i.imgur.com/YTYLyt6.png)

### User page
!['User page wireframe'](https://i.imgur.com/oVwQmee.png)

### Project page
!['Project page wireframe'](https://i.imgur.com/PIyh8vG.png)

## Project Requirements
### MVP
- Working full stack application built with NodeJD, Postgres, Express, and EJS
- MVC file structure
- CRUD user model and CRUD posts model
- Category-posts association (one-to-many) and user-posts association (one-to-many)
- Deployed on Heroku
- Basic sign up and login functionality
- Documentation

### Stretch Goals
- User authentication and authorization, including password hashing
- Many-to-many relationships with likes and comments models
- Geotag functionality (including model + api calls to GoogleMaps (probably))
- Bootstrap (or similar) CSS framework styling
- CSS transitions for stylish menus
- Sort projects by category and/or geotag