var express = require('express'); 
var ejs = require('ejs'); //embedded javascript template engine

var app = express.createServer(express.logger());

var mongoose = require('mongoose'); // include Mongoose MongoDB library
var schema = mongoose.Schema; 

var requestURL = require('request');

/************ DATABASE CONFIGURATION **********/
app.db = mongoose.connect(process.env.MONGOLAB_URI); //connect to the mongolabs database - local server uses .env file

// Include models.js - this file includes the database schema and defines the models used
require('./models').configureSchema(schema, mongoose);

// Define your DB Model variables
var SixWordIt = mongoose.model('SixWordIt');
var Captions = mongoose.model('Captions');
/************* END DATABASE CONFIGURATION *********/

/*********** SERVER CONFIGURATION *****************/
app.configure(function() {
    
    /*********************************************************************************
        Configure the template engine
        We will use EJS (Embedded JavaScript) https://github.com/visionmedia/ejs
        
        Using templates keeps your logic and code separate from your HTML.
        We will render the html templates as needed by passing in the necessary data.
    *********************************************************************************/

    app.set('view engine','ejs');  // use the EJS node module
    app.set('views',__dirname+ '/views'); // use /views as template directory
    app.set('view options',{layout:true}); // use /views/layout.html to manage your main header/footer wrapping template
    app.register('html',require('ejs')); //use .html files in /views

    /******************************************************************
        The /static folder will hold all css, js and image assets.
        These files are static meaning they will not be used by
        NodeJS directly. 
        
        In your html template you will reference these assets
        as yourdomain.heroku.com/img/cats.gif or yourdomain.heroku.com/js/script.js
    ******************************************************************/
    app.use(express.static(__dirname + '/static'));
    
    //parse any http form post
    app.use(express.bodyParser());
    
    /**** Turn on some debugging tools ****/
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

/*
app.get('/about', function(request, response) {
	var templateData = {
				layout: 'layout.html'
		};
  response.render('about.html',templateData);
});

*/

app.get('/', function(request, response) {

	var query = SixWordIt.findOne({});
    query.sort('date',-1); //sort by date in descending order
    
    // run the query and display blog_main.html template if successful
    query.exec({}, function(err, picture){
        
        if (err) {
            console.log(err);
            response.send("an error occurred!");
        }
        
        if (picture == null ) {
            console.log('there is no image');
            response.send("uh oh, can't find that post");

        } else {
		var templateData = {
				layout: 'layout.html',
				picture: picture
		};
		console.log(templateData);
	
  response.render('main.html',templateData);
        }
        
    });





	
});

app.get('/addpic', function(request, response){
        
        response.render('addpic.html');
    });
    
    // receive form POST for new entry /new-entry
app.post('/addpic', function(request, response){

        console.log('Received new picture submission');

        // Prepare the picture entry form into a data object
        var picData = {
            url : request.body.url
        };

        // add a new picture link to the database
        var picture = new SixWordIt(picData);

        // save the picture
        picture.save();

        // redirect to show the single post
        response.redirect('/');
       // response.redirect('/picture/' + picData.date);

    });
    app.post('/addcaption', function(request, response){

        console.log('Received new caption');

        // Prepare the picture entry form into a data object
        var captionData = {
            name : request.param('name'),
            email : request.param('email'),
            text : request.param('text')
        };
		console.log(captionData);

		var query = SixWordIt.findOne({});
    		query.sort('date',-1); //sort by date in descending order
    		query.exec({}, function(err, picture){
        
       		 if (err) {
            console.log(err);
            response.send("an error occurred!");
        	}
        
        if (picture == null ) {
            console.log('there is no image');
            response.send("uh oh, can't find that post");

        } else {
				console.log("******");
				picture.captions.push(captionData);
				picture.save();
				response.redirect('/');
        }
        
    });


});
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});