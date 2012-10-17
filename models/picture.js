// export Schemas to web.js

module.exports.configureSchema = function(Schema, mongoose) {
    
    // Comment - embedded document for Caption
    Comment = new Schema({
      name      : String
    , text      : String
    , date      : { type: Date, default: Date.now }
    });
    
    // Caption - embedded doc for Picture
    var Caption = new Schema({
      text     : String
    , date      : { type: Date, default: Date.now }
    , comment  : [Comment]
    , name      : String
    });
    
    // Picture
    var Picture = new Schema({
      url   : String
    , date      : { type: Date, default: Date.now }
    , caption	: [Caption]
    , author      : { type: Schema.ObjectId, ref: 'User' }
    });

    // add schemas to Mongoose
    mongoose.model('Picture', Picture);
    mongoose.model('Caption', Caption);
    mongoose.model('Comment', Comment);

};