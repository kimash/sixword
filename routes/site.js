/**
  * Module dependencies.
  */
var db = require('../accessDB');

// db.Picture

module.exports = {

    mainpage : function(request, response) {
     // find the most recent picture from the database
     	var today = new Date();
     	//today = setDate(0);
        var todaysPic = db.Picture.findOne({ date : today }).populate('url');
            
            todaysPic.run(function(err, picture){

            if (err) {
                console.log(err);
                response.send("an error occurred!");
            }

            if (picture == null ) {
                console.log('picture not found');
                response.send("uh oh, can't find that picture");

            }   
                templateData = {
                    picture : picture,
                    layout : 'layout.html'// use single entry layout   
                }
                
                console.log(picture);
                response.render('site/main.html', templateData);  
        });

    },
    
	//display new entry form /addpic
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
        response.redirect('/');
       // response.redirect('/picture/' + picData.date);

    },
    
//     getPicByDate : function(request, response){
//         // Get the request picture by date
//         db.Picture.findOne({ date : request.params.date }).populate('url').run(function(err, picture){
// 
//             if (err) {
//                 console.log(err);
//                 response.send("an error occurred!");
//             }
// 
//             if (picture == null ) {
//                 console.log('picture not found');
//                 response.send("uh oh, can't find that picture");
// 
//             }   
//                 templateData = {
//                     picture : picture,
//                     layout : 'layout.html'// use single entry layout
//                     
//                 }
//                 console.log(templateData);
//                 
//                 response.render('blog/blog_single_entry.html', templateData);
//                 
//             }
//         });
//     },
    
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