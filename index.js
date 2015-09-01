(function( window, undefined ){
    var leaderboards = require("./src/leaderboard.js");


    var Gamefroot = {
        Leaderboard: leaderboards
    }




    if (!window.Gamefroot){
        window.Gamefroot = Gamefroot;
    }
})(window);
