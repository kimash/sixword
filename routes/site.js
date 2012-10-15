/**
  * Module dependencies.
  */
var db = require('../accessDB');

// db.Picture

module.exports = {

    mainpage : function(request, response) {
    
     // build the query
        var query = db.BlogPost.find({});
        query.populate('author');
        query.sort('date',-1); //sort by date in descending order
        
        // run the query and display main.html template if successful
        query.exec({}, function(err, allPosts){
            // prepare template data
            templateData = {
                posts : allPosts
            };

            // render the card_form template with the data above
            response.render('site/main.html', templateData);

        });

    },
    
	//display new entry form /new-entry
    getAddPic : function(request, response){
        //display the picture entry form
        templateData = {
            currentUser : request.user
        }
        
        response.render('site/addpic.html', templateData);
    },
    
    // receive form POST for new entry /new-entry
    postAddPic : function(request, response){

        console.log('Received new picture submission');
        console.log(request.body);

        // Prepare the blog post entry form into a data object
        var picData = {
            url : request.body.url,
            author : request.user._id
        };

        // create a new blog post
        var post = new db.Picture(picData);

        // save the blog post
        post.save();

        // redirect to show the single post
       // response.redirect('/entry/' + blogPostData.urlslug); // for example /entry/this-is-a-post

    },
  
}