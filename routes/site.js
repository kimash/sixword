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
        
        // run the query and display blog_main.html template if successful
        query.exec({}, function(err, allPosts){
            // prepare template data
            templateData = {
                posts : allPosts
            };

            // render the card_form template with the data above
            response.render('site/main.html', templateData);

        });

    },
    
    recent : function(request, response){

        // create date variable for 7 days ago
        var lastWeek = new Date();
        lastWeek.setDate(-7);

        // query for all blog posts where the date is greater than or equal to 7 days ago
        var query = db.BlogPost.find({ date : { $gte: lastWeek }});
        query.populate('author');
        query.sort('date',-1);
        query.exec(function (err, recentPosts) {


          // prepare template data
          templateData = {
              posts : recentPosts
          };

          // render the card_form template with the data above
          response.render('blog/recent_posts.html', templateData);

        });

    },
    
    getSingleEntry : function(request, response){
        // Get the request blog post by urlslug
        db.BlogPost.findOne({ urlslug : request.params.urlslug }).populate('author').run(function(err, blogpost){

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
        });
    },
    
  
}