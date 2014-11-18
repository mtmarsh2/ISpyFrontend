angular.module('starter.services', [])

.factory('Classify', function($http)  {
  return {
    getDailySpot: function(inputs) {
      
      $http.defaults.headers.common.Authorization = inputs['token'];
      return $http.get('http://104.131.103.91/classify/daily_spot/', inputs);
    }
  }
})

.factory('Auth', function($http) {
    return {
        login: function(inputs) {
            
            return $http.post('http://104.131.103.91/accounts/login/',inputs); 
        },
        register: function(inputs) {
            return $http.post('/104.131.103.91/accounts/register/', inputs);
        },
        getUserCredentials: function() {
            return {'user': window.localStorage.getItem('username'), 
            'password': window.localStorage.getItem('password'), 'token':window.localStorage.getItem('token')}
        },
        setUserCredentials: function(username, password, token) {
            window.localStorage.setItem('username',username);
            window.localStorage.setItem('password',password);
            window.localStorage.setItem('token', 'Token ' + token)
        }
    }
})


/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
