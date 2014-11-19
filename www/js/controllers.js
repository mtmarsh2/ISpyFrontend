angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, Auth) {
    user_credentials = Auth.getUserCredentials()
    if (user_credentials['username'] != null) {
        $location.path( "/tabs/dash" );
    }
})

.controller('DashCtrl', function($scope, Classify, Auth) {
    Classify.getDailySpot(Auth.getUserCredentials())
        .success(function (data, status, headers, config) {
            console.log(data);
            
            $scope.label = data['label'];
            $scope.daily_image_url = data['image_path'];
            $scope.label_exists = true;
            $scope.image_exists = true;
        })
        .error(function(data, status, headers, config) {
            console.log(data);
        })
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AuthCtrl', function($scope,$location, Auth) {
    $scope.login = function(user, error) {
        Auth.login(user)
        .success(function (data, status, headers, config) {
            //save token in local storage
            
            console.log(data);
            Auth.setUserCredentials(user.username, user.password, data['token']);
            $location.path('/tab/dash');
        })
        .error(function(data, status, headers, config) {
            $scope.error_text = String(data['error']);
        })
    }
})

.controller('ClassifyCtrl', function($scope) {
    $scope.takePicture = function() {
        $scope.image_taken = true;
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL
        });
    };
    function onSuccess(imageURI) {
          console.log("it worked");
          $scope.daily_image_url = imageURI;
    };
    function onFail(message) {
          alert('Failed because: ' + message);
    };

});
