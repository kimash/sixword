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

        // Prepare the picture entry form into a data object
        var picData = {
            url : request.body.url,
            author : request.user._id
        };

        // add a new picture link to the database
        var picture = new db.Picture(picData);

        // save the picture
        picture.save();

        // redirect to show the single post
       // response.redirect('/entry/' + blogPostData.urlslug);

    },
    
 //  getPicById : function(request, response) {
// 
//       var requestedPicID = request.params.picId;
// 
//       db.Picture.findById(requestedPicID).run(function(err, picture) {
// 
//             if (err) {
//               console.log(err);
//               response.send("an error occurred!");
//             }
// 
//           if (picture == null ) {
//                console.log('pic not found');
//                 response.send("uh oh, can't find that pic");
// 
//             } 
//                 templateData = {
//                     picture : picture,
//                     layout : 'layout_single_entry.html'// use single entry layout
//                     
//                 }
//                 console.log(templateData);
//                 
//                 response.render('blog/blog_single_entry.html', templateData);
//             }
// 
//         })
// 
//     },
  
}