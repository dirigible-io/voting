function VotesController($scope, $http){
    var playersUrl = "/dirigible/services/js-secured/voting/user/players.js";
    var votesUrl = "/dirigible/services/js-secured/voting/user/vote.js";
    
    $scope.voted = undefined;
    $scope.columns = [
        {
            name: 'name',
            display: 'Player'
        }, 
        {
            name: 'team',
            display: 'Team'
        },
        {
            user: 'userInfo'
        }
    ];
    
    refreshData();
    
    function refreshData(){
        $http.get(playersUrl)
            .success(function(data){
                $scope.items = data;
                for(var i = 0; i < data.length ; i ++){
                    if(data[i].userInfo){
                        $scope.userInfo = data[i].userInfo;
                        $scope.voted = $scope.userInfo.voted;
                    }
                }
            })
            .error(function(data){
                
            });
    }
    
    $scope.vote = function(player){
        var vote = {};
        vote.player_id = player.id;
        vote.voted_at = new Date();
        vote.voter = $scope.userInfo.loggedInUser;
        
        $http.post(votesUrl, vote)
            .success(function(){
                refreshData();
            })
            .error(function(response){
                
            });
    }
      
}
