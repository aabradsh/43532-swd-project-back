This is the back-end of our project for TechTask. 

We are planning on using MongoDB (NOSQL) for our database. But we know that for Assignment 2 we do not need to implement that yet. 

The way that it runs is by once again using "npm start" which will launch the server with port 4000, once that is running, use the command "npm start" in the terminal in the front-end repository.

For the unit testing, (provided in the "app.test.js" file), you may run the command "npm test" in the terminal of the back-end repo. 
You may need to install the following line(s):
"npm install --save-dev @babel/preset-env @babel/preset-react" 
"npm install --save-dev @babel/preset-react"
"npm install --save-dev jest-environment-jsdom"
to run the unit tests.

Our modules consist of controllers, models, and routes. Controllers is the logic that actually determines how the data is going to be managed. Models is where the data will actually be. Routes is where we connect the backend to our frontend.
