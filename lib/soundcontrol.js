(function(){
    
    var exec = require('child_process').exec;
    var paused = false;
    var sc = {
        version: '0.1'
    };
    
    /* public methods */
    
    sc.isItunesOpen = function(callback) {
        exec("ps aux | grep -i iTunes.app", function(err,stdout,stderr){
            var lines = stdout.split('\n');
            var found = lines.length;
            
            for (var i = 0; i < lines.length; i++) {
                var trimmed = lines[i].replace(/^\s+|\s+$/g, '');;
                
                if (!trimmed || trimmed.search('iTunesHelper') !== -1 || lines[i].search('grep') !== -1) {
                    found--;
                }
            }
            
            callback(err, found > 0);
        });
    };
    
    sc.isSpotifyOpen = function(callback) {
        exec("ps aux | grep -i Spotify.app", function(err,stdout,stderr){
            var lines = stdout.split('\n');
            var found = lines.length;
            
            for (var i = 0; i < lines.length; i++) {
                var trimmed = lines[i].replace(/^\s+|\s+$/g, '');;
                
                if (!trimmed || lines[i].search('grep') !== -1) {
                    found--;
                }
            }
            
            callback(err, found > 0);
        });
    };
    
    sc.isPlaying = function(app, callback) {
        app = app || "iTunes";
        
        exec("osascript -e 'tell application \""+ app +"\" to player state as string'", function(err,stdout,stderr){
            if ($.trim(stdout) == "playing") {
                paused = app;
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
    };
    
    sc.pauseAll = function() {
        sc.isItunesOpen(function(err, open){
            if (!open) return;
            
            sc.isPlaying('iTunes', function(err, playing){
                if (!playing) {
                    sc.pause('iTunes');
                }
            });
        });
        
        sc.isSpotifyOpen(function(err, open){
            if (!open) return;
            
            sc.isPlaying('spotify', function(err, playing){
                if (playing) {
                    sc.pause('spotify');
                }
            });
        });
    };
    
    sc.pause = function(app) {
        app = app || "iTunes";
        exec("osascript -e 'tell application \""+ app +"\" to pause';");
        paused = app;
    };
    
    sc.play = function() {
        app = app || "iTunes";
        exec("osascript -e 'tell application \""+ app +"\" to play';");
    };
    
    sc.resume = function() {
        if (paused) {
            applicationPlay(paused);
            paused = false;
        }
    };
    
    module.exports = sc;
})();
