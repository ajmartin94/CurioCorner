# CurioCorner
SEI Project 2

## Project Description
A community app designed to share hobbies and DIY projects. App will be made using NodeJS, Express, Embedded JavaScript, CSS, and deployed on Heroku, available to the public. The app will contain features that allow for users to create posts that detail their DIY projects and allow other users to interact with the posts. The app will allow users to create accounts, save account information in a database, and have authentication and authorization features.  


## Technology Used
- NodeJS, Express, Sequelize, PostGres
- Embedded JavaScript, CSS, and CSS frameworks
- Bootstrap, TinyMCE, AWS S3, Multer


## User Stories
- As a user, I want to create a secure account so that I can post my projects. 
- As a user, I want to create a secure account so that I can interact with others' projects. 
- As a user, I want to sort the projects so that I can find what I am interested in. 
- As a user, I want to upload pictures to my projects so that others can see my project details. 
- As an unregistered user, I want to be able to use the site and see projects so that I can be inspired to do them on my own. 
- As a user, I want to follow my favorite creators. 
- An an unregistered user, I want to see any creator's profile. 
- As a user, I want to leave comments on any project. 
- As a commenter, I want to be able to like comments and edit my own comments.
- As a user, I want to be able to edit and delete my projects.


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
- Working full stack application built with NodeJD, Postgres, Express, and EJS - *Complete*
- MVC file structure - *Complete*
- CRUD user model and CRUD posts model - *Complete*
- Category-posts association (one-to-many) and user-posts association (one-to-many) - *Complete*
- Deployed on Heroku - *Complete*
- Basic sign up and login functionality - *Complete*
- Documentation - *Complete*

### Stretch Goals
- User authentication and authorization, including password hashing - *Complete*
- Many-to-many relationships with likes and comments models - *Complete*
- Geotag functionality (including model + api calls to GoogleMaps (probably)) - *Future possibility*
- Bootstrap (or similar) CSS framework styling - *Complete*
- CSS transitions for stylish menus - *Future possibility*
- Sort projects by category and/or geotag - *Complete*

### Extra Functions Incorporated
- TinyMCE rich text editor for post content
- AWS hosted image storage
- Carousel project display on user profile
- Follow button for user profiles
- Like and edit function for comments. Comments also sort by highest like on page.

google maps API key: AIzaSyAkI6D2lfATOlMrdchg5S9lOQ2bXauOXeg
