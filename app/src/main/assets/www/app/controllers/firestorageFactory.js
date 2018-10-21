(function () {
    "use strict";

    var app = angular.module('schoolApp');

    app.factory('firestorageFactory', ['$filter','$q', function ($filter,$q) {


        var fileUpload = function(filePath, file)
        {

                firebaseAuth();

                var deferred = $q.defer();

                var storageRef = firebase.storage().ref();


                console.log('filePath before upload ' + filePath)

                // Create a reference to 'images/mountains.jpg'
                var imageRef = storageRef.child( filePath + '.jpg');


                // Create file metadata including the content type
                var metadata = {
                    contentType: 'image/jpeg',
                };


                //var file = $scope.myFile; // use the Blob or File API
                var uploadTask = imageRef.put(file, metadata);//.then(function (snapshot) {
                    //     console.log('Uploaded a blob or file!');
                    // });


                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {

                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;

                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        var downloadURL = uploadTask.snapshot.downloadURL;

                        console.log('upload downloadURL ' + downloadURL);
                        deferred.resolve(downloadURL);


                    });


                    return deferred.promise;


        };

        var fileDownload = function(filePath, img)
        {

                    firebaseAuth();

                    var deferred = $q.defer();


                    var storageRef = firebase.storage().ref();

                    //console.log('download filepath ' + filePath);

                    // Create a reference to the file we want to download
                    var imageRef = storageRef.child(filePath + '.jpg');

                    // Get the download URL
                    imageRef.getDownloadURL().then(function(downloadURL) {
                    // Insert url into an <img> tag to "download"

                        //console.log('download url ' + downloadURL);

                        deferred.resolve(downloadURL);

                        
                    }).catch(function(error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object_not_found':
                        // File doesn't exist
                        break;

                        case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                        case 'storage/canceled':
                        // User canceled the upload
                        break;


                        case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                    }
                    });



                    return deferred.promise;

        };


        //---firebase authentication before storage--
        var firebaseAuth = function(){

            var deferred = $q.defer();

            var signInStatus=null;

            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  console.log('user signed in');
                  signInStatus="user signed in";
                  //console.log(user.displayName);

                } else {
                    // No user is signed in.

                 //console.log('user not signed in');

                  firebase.auth().signInWithEmailAndPassword("demo@rootmindtech.com", "demo123")
                  .then(function(result)
                  {
                    console.log('user signed in using credentials');
                    signInStatus="user signed in using credentials";

                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.log('user signed in using credentials error ' + error.message );
                    signInStatus="user signed in using credentials error"  + error.message; 


                  });

                }
              });

              deferred.resolve(signInStatus);
              return deferred.promise;


            
        };

        return{


            fileUploadFirestorage: fileUpload,
            fileDownloadFirestorage: fileDownload,
            firestorageAuth: firebaseAuth

        }

        

    }]);



})(); //function