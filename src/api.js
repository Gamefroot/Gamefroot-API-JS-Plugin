var request = require("superagent");
var _ = require("lodash");

module.exports = {
    token: {},
    get: function( url, data, options, cb ){
        return this.request( "get", url, data, options, cb);
    },
    post: function( url, data, options, cb ){
        return this.request( "post", url, data, options, cb);
    },
    request: function( type, url, data, options, cb ){
        if ( !this.token.access_token ){
            this.getToken(options, function( tokens ){
                data = _.merge( data, {
                    access_token: tokens.access_token
                });

                if ( type == "post" ){
                    request
                        .post( "http://dev.gamefroot.com:3000/v1" + url )
                        .send( data )
                        .end( function( err, res ){
                            if (!err){
                                cb( res.body.data );
                            }
                        });
                } else {
                    request
                        .get( "http://dev.gamefroot.com:3000/v1" + url )
                        .query( data )
                        .end( function( err, res ){
                            if (!err){
                                cb( res.body.data );
                            }
                        });
                }
            });
        } else {
            data = _data = _.merge( data, {
                access_token: this.token.access_token
            });
            
            if ( type == "post" ){
                request
                    .post( "http://dev.gamefroot.com:3000/v1" + url )
                    .send( data )
                    .end( function( err, res ){
                        if (!err){
                            cb( res.body.data );
                        }
                    });
            } else {
                request
                    .get( "http://dev.gamefroot.com:3000/v1" + url )
                    .query( data )
                    .end( function( err, res ){
                        if (!err){
                            cb( res.body.data );
                        }
                    });
            }
        }
        return this;
    },

    getToken: function(options, cb){
        var self = this;
        request
            .get( "http://dev.gamefroot.com:3000/v1/token" )
            .query( {client_id: options.client_id})
            .end( function( err, res ){
                if ( !err ){
                    self.token = res.body;
                    cb( res.body );
                }
            });
    },

    refresh: function(){
        request
            .get( "http://dev.gamefroot.com:3000/v1/refresh_token" )
            .end( function( err, res ){
                console.log( err, res );
            });
    }





}
