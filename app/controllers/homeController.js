(function(){
    'use strict';
    angular
        .module('ndog')
        .controller('homeController' , homeController);
    function homeController(mainService , toastr ){
        var home = this, counter = 0, arr = [], checkWiner = [];
        home.action = {
            getWords : function(difficulty){
                home.lost = false;
                home.win = false;
                home.no = 0;
                counter = 0;
                checkWiner = [];
                arr = [];
                mainService.load()
                    .then(function(res){
                            var allWords = res.data;
                            allWords.sort(function() {
                                return 0.5 - Math.random()
                            });
                            var i = 0;
                            for(i;i<5;i++){
                                arr.push(allWords[i]);
                            }
                        },
                        function(){


                        })
                    .then(function(){
                        home.output = [];
                        angular.forEach(arr ,function(el){
                            home.output.push({guesed:false , word: el});
                        });
                        allLeters(arr,difficulty);
                    });
            },
            check : function(item,index){
                home.left--;
                home.letters[index].clicked = true;
                if (home.left === 0) {
                    home.lost = true;
                }
                else {
                    var doubled = [];
                    angular.forEach(home.fs , function(el){
                        if (el.let === item){
                            el.chosen = true;
                            doubled.push(el);
                            if(doubled.length > 1){
                                home.left--;
                            }
                            counter++;
                            home.left++;
                        }
                    });
                }
                if(counter === home.fs.length){
                    counter = 0;
                    home.output[home.no].guesed = true;
                    home.no++;
                    if (home.no === 5){
                        home.win = true;
                    }
                    else {
                        toastr.success('Bravo! When you will win N-dog will eat ' +  home.output[home.no - 1].word);
                        angular.forEach(home.letters , function(el){
                            el.clicked = false;
                        });
                        letters(arr);
                    }
                }
            },
            leave: function(){
                window.location = 'https://cdn.meme.am/cache/instances/folder897/400x/52032897.jpg';
            }
        };
        function allLeters(arr,difficulty){
            var allLet = [];
            if(difficulty === 1){
                angular.forEach(arr,function(el){
                    var i = 0,
                        length=el.length;
                    for(i;i<length;i++){
                        allLet.push(el[i]);
                    }
                });
                allLet.sort();

            }
            else {
                allLet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            }
            var i = 0,
                length = allLet.length,
                sorted = [];
            for (i;i<length; i++) {
                if (allLet[i] !== allLet[i + 1]) {
                    sorted.push({let:allLet[i] , clicked:false});
                }
            }
            home.letters = sorted;
            letters(arr);
        }
        function letters(arr) {
            home.left = 6;
            home.fs = [];
            angular.forEach(arr[home.no] , function(el){
                home.fs.push({let: el , chosen: false})
            });
        }
    }
})();

