 var myApp = angular.module("myApp", [ "ngRoute"]);
        
        myApp.config(function($routeProvider){
            
            $routeProvider
                .when("/", { templateUrl: 'pages/home.html',
                             controller: 'firstController'        
                           } )
                .when("/about", { templateUrl: 'pages/about.html',
                             controller: 'firstController'        
                           } )
                .when("/catalog", { templateUrl: 'pages/catalog.html',
                             controller: 'firstController'        
                           } )
                .when("/contact", { templateUrl: 'pages/contact.html',
                             controller: 'firstController'        
                           } )
                .otherwise({ redirectTo : "/"});
        
        });
                
        myApp.controller("firstController", function($scope,$http){ 
                      
             $scope.products = [];      //Initializing new empty array
                                            
            //AJAX call function
            function GetProducts() {
                
                $http({                  //Defining the $http service for getting the people
                    method: 'GET',
                    url: '/onlineItems'
                })
                .success(function (response) {      //response would be array with multiple objects
                    $scope.products = response;     //copying array - setting new value of $scope.products array      
                });
            }
            
            // ~~~~ Data displaying on page load ~~~~~
            GetProducts();
                   
            // ~~~~ Adding a new product ~~~~
            $scope.createProduct = function () {
                $http({
                    method: 'POST',
                    url: '/onlineItems',
                    data : {
                        addItem : $scope.newItemName,
                        description : $scope.newItemDescription,
                        priceItem : $scope.newItemPrice
                    }
                })
                .success(function (data) {          // data would be single object
                    console.log(data);
                    $scope.products.push(data); 
                    
                    $('input[id=addItem]').val("");
                    $('input[id=descriptionItem]').val("");
                    $('input[id=priceItem]').val("");
                });
                
            };
                 
            // ~~~~ Removing The Data ~~~~
            $scope.removeMe = function(pId){ 
                $http({
                    method: 'DELETE',
                    url: '/onlineItems/' + pId
                })
                .success(function (data) { 
                
                     removeItem($scope.products,'id', pId);
                });    
            };
            
            function removeItem(ary, prop, val) {
            
                for( var i=0; i<ary.length; i++){
                    
                   // console.log(ary[i]);
                   // console.log(ary[i][prop]);
                   // console.log(val);
                    
                    if(ary[i][prop] == val) {
                        
                        ary.splice(i, 1);           //use delete on object literals. Use splice on arrays.
                        //delete ary[i];   
                    }
                }
            }
                
        });        
        