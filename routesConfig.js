/** routes.js
  */
var passport = require('passport');

// Route methods
var siteRoute = require('./routes/site');
var blogRoute = require('./routes/blog');
var userRoute = require('./routes/user');

// If user is authenticated, redirect to 
function ensureAuthenticated(request, response, next) {
  if (request.isAuthenticated()) { return next(); }

  request.flash("redirect",request.originalUrl);
  response.redirect('/login');
}

module.exports = function(app) {

	/*********** SITE ROUTES ************/
    // main page - display all pictures => change to newest?
    // More Mongoose query information here - http://mongoosejs.com/docs/finding-documents.html
    app.get('/', siteRoute.mainpage );
    
    // add new picture to database
    app.get('/addPic', ensureAuthenticated, siteRoute.getNewPic);
    
    // receive picture form submission
    app.post('/addPic', ensureAuthenticated, siteRoute.postNewPic);
    
    //get pic by date
    app.get("/picture/:date", siteRoute.getPicByDate);
    
    // .findById example
    // Get a picture by its unique objectId (._id)
    //app.get("/picture/:picId", siteRoute.getPicById);
    
    // add a caption to a picture
    //app.post('/caption', siteRoute.postCaption );
    
    /*********** BLOG ROUTES ************/
    // main page - display all blog posts
    // More Mongoose query information here - http://mongoosejs.com/docs/finding-documents.html
    //app.get('/', blogRoute.mainpage );
    
    //get most recent
    app.get("/recent", blogRoute.recent);
    
    // Display a single blog post
    app.get('/entry/:urlslug', blogRoute.getSingleEntry);
    
    // .findById example
    // Get a blogpost by its unique objectId (._id)
    app.get("/entryById/:postId", blogRoute.getSingleEntryById);
    
    // add a comment to a blog post
    app.post('/comment', blogRoute.postComment );
    
    // CREATE A NEW BLOG POST
    app.get('/new-entry', ensureAuthenticated, blogRoute.getNewEntry);
    
    // receive a form submission
    app.post('/new-entry', ensureAuthenticated, blogRoute.postNewEntry);
    
    // get entry update form
    app.get("/update/:postId", ensureAuthenticated, blogRoute.getEntryUpdate);
    
    app.post("/update", ensureAuthenticated, blogRoute.postEntryUpdate);
    
    /*********** API & JSON ROUTES ************/
    
    // return all blog entries in json format
    app.get('/data/allposts', blogRoute.apiAllPosts);
    
    // This is a demonstration of using "remote" JSON data.
    app.get('/jsontest', blogRoute.jsontest); //end of /jsontest route
    
    /************ YAHOO  WEATHER EXAMPLE **************/
    app.get('/weather', blogRoute.weatherRedirect);
    app.get('/weather/:location', blogRoute.weatherMain);
    
    
    // AJAX Example Page
    app.get("/ajax", blogRoute.ajaxExample);
    
    // AJAX JSONP Example
    app.get("/jsonp", blogRoute.jsonpExample);
    


    /*********** USER ROUTES ************/    
    
    // Register User - display page
    app.get('/register', userRoute.getRegister);
    
    //Register User - receive registration post form
    app.post('/register', userRoute.postRegister);
    
    // Display login page
    app.get('/login', userRoute.login);
    
    // Login attempted POST on '/local'
    // Passport.authenticate with local email and password, if fails redirect back to GET /login
    // If successful, redirect to /account
    app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(request, response) {
        if (request.param('redirect') != "") {
            //redirect to page that initiated Login request
            response.redirect( request.param('redirect') );
        } else {
            response.redirect('/account');
        }
    });
    
    // Display account page
    app.get('/account', ensureAuthenticated, userRoute.getAccount);

    app.post('/account/changepassword', ensureAuthenticated, userRoute.postChangePassword),
    
    // Logout user
    app.get('/logout', userRoute.logout);

    app.get('/getusers', userRoute.getUsers);
}
