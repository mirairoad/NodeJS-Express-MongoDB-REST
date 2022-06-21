require('dotenv').config()
const path = require('path')
const express = require("express");
const morgan = require("morgan");
require("./config/dbConn");
const port = process.env.PORT || 1338;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const myParser = require("body-parser");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");

//importing routes
const userRouter = require("./routes/api.user");
const profileRouter = require("./routes/api.profile");
const taskRouter = require("./routes/api.task");
const postRouter = require("./routes/api.post");

// Express declaration
const app = express();

// Logger Declaration
app.use(logger);

// Handle options credentials check - before CORS!
app.use(credentials);
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(myParser.json({limit: '64mb'}));
app.use(myParser.urlencoded({limit: '64mb', extended: true}));

// Middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//passenger config
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      httpOnly:true,
      maxAge:parseInt(process.env.SESSION_MAX_AGE),
      sameSite: 'lax',
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve static page
app.get("*");

app.get("/", function(req,res){
  res.sendFile(path.join(`${__dirname}/views/index.html`));
})

// API Routes
app.use(userRouter);
app.use(profileRouter);
app.use(postRouter); 
app.use(taskRouter);

//Error Handler middleware
app.use(errorHandler);

app.get("/*", function(req,res){
  res.sendFile(path.join(`${__dirname}/views/404.html`));
});

//Starting server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
