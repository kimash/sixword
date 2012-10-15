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
    getNewPic : function(request, response){
        //display the picture entry form
        templateData = {
            currentUser : request.user
        }
        
        response.render('site/addpic.html', templateData);
    },
    
    // receive form POST for new entry /new-entry
    postNewPic : function(request, response){

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
    
        getPicById : function(request, response) {

        var requestedPostID = request.params.postId;

        db.BlogPost.findById( requestedPostID).populate("author").run(function(err, blogpost) {

            if (err) {
                console.log(err);
                response.send("an error occurred!");
            }

            if (blogpost == null ) {
                console.log('post not found');
                response.send("uh oh, can't find that post");

            } else {
                //determine if current user is the owner of the entry
                if (typeof request.user != "undefined" && (request.user._id.toString() == blogpost.author._id.toString()) ) {
                    isOwner = true;
                } else {
                    isOwner = false;
                }
                
                templateData = {
                    user_is_owner : isOwner,
                    blogpost : blogpost,
                    layout : 'layout_single_entry.html'// use single entry layout
                    
                }
                console.log(templateData);
                
                response.render('blog/blog_single_entry.html', templateData);
            }

        })

    },
  
}