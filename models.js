// export Schemas to web.js
module.exports.configureSchema = function(Schema, mongoose) {
    
    // Comment - is an embedded document for BlogPost
    Captions = new Schema({
      name      : String
    , email     : String
    , text      : String
    , date      : { type: Date, default: Date.now }
    });
    
    // BlogPost - 
    var SixWordIt = new Schema({
      url     : String
    , date      : { type: Date, default: Date.now }
    , captions  : [Captions]
    });

    // add schemas to Mongoose
    mongoose.model('SixWordIt', SixWordIt);
    mongoose.model('Captions', Captions);

};