# Gympoint
Application to register and manipulate student, enrollment and plan data for gyms.

Here are some instructions you will need to get the project running :

**Backend**:

* create the docker POSTGRES container to connect the server to the database, making the necessary configuration in the 
src/config/dabase.js file, and editing the .env.example file . 

* don't forget to install all the dependencies in the package.json file , by running the command ```$ yarn``` or ```npm i```.

* after all the initial setup is finished, to get the server running just run ```$ yarn dev```.
* run ``` $ yarn queue ``` to start the queue server. 

**Frontend**:

* install all the dependencies in the package.json file by running ```$ yarn``` or ```npm i``` .
if necessary add edit the server address in the  ```src/services/api.js``` file to connect your application to the server.

* Run ```$ yarn start``` to get the application running.

**Mobile**:

* install all the dependencies in the package.json file by running ```$ yarn``` or ```npm i```

* The application was developed being tested on IOS, but you can also emulate it on Android. For that, don't forget
to edit the ```src/services/api.js``` file, replacing ' localhost ' with '10.0.2.2' if you're running it on Android.

* On IOS, after installing all the depencies by running ```$ yarn``` or ```npm i```, you need to cd to the ios folder and
run ```$ pod install``` to install all cocoapods dependencies.

- Important: some of the dependencies, especially the ones required by the react-navigation in its documentation,
need to be linked manually in order to work. If something does not run appropriately, try linking the depen-
dencies that you installed right before the error ocurred. 

* to run the application run ```$ yarn react-native run-android``` or ```$ yarn react-native run-ios```, depending on Which
platform you're testing your application.
