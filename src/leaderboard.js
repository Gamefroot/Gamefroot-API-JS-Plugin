var api = require("./api.js");

var leaderboard = function( options ){
    this.id = options.id;
    this.client_id = options.client_id;
    return this;
};

/**
 * Set's a score, to a specific user.
 * @public
 * @method function
 * @param  {int} score [description]
 * @param {int[]} user The user
 * @return {[type]}       [description]
 */

leaderboard.prototype.set = function( score, user, tag, callback ){
    if ( !user ){
        user = this.getUser();
    }
    //now that we have the score
    //and the user we now need to submit it...

    if ( !tag ){
        tag = null;
    }


    //post...
    api.post( "/leaderboards/" + this.id + "/", {
        score: score,
        user: user,
        tag: tag
    }, {
        client_id: this.client_id
    }, function( score ){
        //yay, done
        if ( typeof callback == "function"){
            callback ( score );
        }
    });
    return this;
};


leaderboard.prototype.get = function( options, callback ){
    if ( options == null || options.order ){
        options = {};
        //just get all the scores...
        api.get( "/leaderboards/" + this.id, {
            order: options.order || "id DESC"
        }, {
            client_id: this.client_id
        }, function( score ){
            //yay, done
            if ( typeof callback == "function"){
                callback ( score );
            }
        });
    } else if ( options.scoreID ){
        api.get( "/leaderboards/" + this.id + "/scores/" + options.scoreID + "/", {}, {
            client_id: this.client_id
        }, function( score ){
            //yay, done
            if ( typeof callback == "function"){
                callback ( score );
            }
        });
    }
};


leaderboard.prototype.getUser = function(){
    return 1;
}


module.exports = leaderboard;
