(function(){
    
    var exec = require('child_process').exec;
    var paused = false;
    var apps = [
        'iTunes',
        'spotify',
        'rdio'
    ];
    var sc = {
        version: '0.1'
    };
    
    /* public methods */
    
    sc.isPlaying = function(app, callback) {
        exec("osascript -e 'tell application \""+ app +"\" to player state as string'", function(err,stdout,stderr){
            if (stdout.trim() == "playing") {
                paused = app;
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
    };
    
    sc.isSpotifyPlaying = function(callback) {
        sc.isPlaying('spotify', callback);
    };
    
    sc.isItunesPlaying = function(callback) {
        sc.isPlaying('iTunes', callback);
    };
    
    sc.isRdioPlaying = function(callback) {
        sc.isPlaying('rdio', callback);
    };
    
    sc.pauseAll = function() {
        
        apps.forEach(function(app){
            
            isAppOpenMac(app, function(err, open){
                if (!open) return;
                
                sc.isPlaying(app, function(err, playing){
                    if (playing) sc.pause(app);
                });
            });
        });
    };
    
    sc.pause = function(app) {
        exec("osascript -e 'tell application \""+ app +"\" to pause';");
        paused = app;
    };
    
    sc.play = function(app) {
        exec("osascript -e 'tell application \""+ app +"\" to play';");
    };
    
    sc.resume = function() {
        if (paused) {
            sc.play(paused);
            paused = false;
        }
    };
    
    
    /* private methods */
    
    var isAppOpenMac = function(app, callback) {
        
        exec("osascript -e 'tell application \"System Events\" to (name of processes) contains \""+ app +"\"';", function(err,stdout,stderr){
            callback(err, stdout.trim() == "true");
        });
    };
    
    module.exports = sc;
})();
