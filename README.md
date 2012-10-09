# Six Word Headlines

Schema for MongoDB will be stored in **/models/
JavaScript will be stored in **/static/js/

# Setup
Heroku and MongoLab have provided a mongodb:// connection string in your Heroku config. This is your "username and password" to get access. We can keep the connection string out of the code and private by putting it inside a .env environment variable file. 

**If you already have an existing MONGOLAB account set up you can copy the .env file into this directory.**

Get your connection URI

	heroku config | grep MONGOLAB_URI

Copy the Mongo URI connection string starting from **mongodb://** to the end, will look like

    mongodb://heroku_randomapp:hashedpassword@subdomain.mongolab.com:port/heroku_randomapp
    
Create or edit existing **.env** file 

    MONGOLAB_URI=mongodb://heroku_randomapp:hashedpassword@subdomain.mongolab.com:port/heroku_randomapp
    
When you start your Heroku app with 

    foreman start
    
You have access to the MONGOLAB_URI with this variable

    process.env.MONGOLAB_URI
    
This will also run when deployed to Heroku

# Install Node Modules

    npm install
    
# Run locally

    foreman start
    
Visit on your browser at [http://localhost:5000](http://localhost:5000)

------- 

# Run on Heroku

Commit all changes

    git commit -am "my commit message"
    
Push to Heroku

    git push heroku master
    
Open in browser the lazy man way

    heroku open
    