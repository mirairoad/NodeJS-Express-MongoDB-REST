# RESTAPI-ADVANCED
this is my RESTfulAPi v0.01

# Libraries
sendgrid/mail,
types/date-fns, 
cookie-parser, 
cors, 
date-fns, 
express, 
express-session, 
lodash, 
mongodb, 
mongoose, 
morgan, 
multer, 
passport, 
passport-google-oauth20, 
passport-local-mongoose, 
sendgrid, 
sharp, 
uuid, 
validator.

# Installation
1) npm install to download the packages
2) set up the enviroment variables on your server or through the file.env
3) install mongoDB or create an account on Atlas
4) create an account sendgrid and request the APIs

REST API
For fetching the data from the RESTAPI it may be a good Idea to use POSTMAN. You will find below a PDF with the REST API Routes available so far.
REST_API_ROUTES

# Users
POST http://localhost:1338/api/signup
username: email@example.com
password: theGoodDolphin@10


POST http://localhost:1338/api/login
username: email@example.com
password: theGoodDolphin@10


POST http://localhost:1338/api/logout
Empty Body


GET http://localhost:1338/api/users/me
Empty Body


PATCH http://localhost:1338/api/users/me
Empty Body


DELETE http://localhost:1338/api/users/me
Empty Body


POST http://localhost:1338/api/users/change-password/me
currentpassword: theGoodDolphin@10
newpassword: theGoodShark@10


POST http://localhost:1338/api/activate/:id
you will find this link inside you mailbox


POST http://localhost:1338/api/forgotten/password
username: email@example.com


POST http://localhost:1338/api/users/set-password/:id/:reset_link
This link will be active after hitting the route forgotten password.

# Profile
POST http://localhost:1338/api/profile
profile_name: email@example.com
profile_job: theGoodDolphin@10
profile_website: theexample.com@10
profile_bio: I am an enthusiastic full stack developer.


GET http://localhost:1338/api/profile/me
This will read the profile.


PATCH http://localhost:1338/api/profile/update
profile_name: email@example.com
profile_job: theGoodDolphin@10
profile_website: theexample.com@10
profile_bio: I am an enthusiastic full stack developer.


DELETE http://localhost:1338/api/profile/delete
this will delete the profile attached to the user.

Avatar
POST http://localhost:1338/api/profile/avatar
profile_avatar: png, jpeg, jpg.


GET http://localhost:1338/api/profile/avatar
This will read the profile picture in base64.


DELETE http://localhost:1338/api/profile/avatar/delete
This will delete the profile picture.

 
# Posts
POST http://localhost:1338/api/posts
title: Good Evening
description: I am just a post.


GET http://localhost:1338/api/posts?page=1&size=3
This will give you back every posts in SSR, you can select the quantity adn the page.
*please notice the JSON data will give you back:
UID and the Author name.


GET http://localhost:1338/api/posts/me?page=1&size=3
This will give you back post with OwnerPolicy.


GET http://localhost:1338/api/posts/:id
This will give you back the post requested.


PATCH http://localhost:1338/api/posts/:id
title: Good Evening
description: I am just a post.


DELETE http://localhost:1338/api/posts/:id
This will delete the post.


# Next Features
- Frontend dashboard based on VUE.js.
- Ability to create your own REST APIs without coding, pass the model name, hit the route, boom… Done.
- Admin can control and delete any collection from the dashboard.
- API routes have the choice to be protected.
- CORS can be controlled by the dashboard and allows only the genuine clients.
- We are on GitHub
- Create a community
