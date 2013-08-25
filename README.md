# SoundControl - Music management


## Introduction

SoundControl is a library for managing multiple music players including iTunes and Spotify (currently OSX only). The library lets you globally pause and resume music playback. It is used in the Sqwiggle desktop client for Mac and works well with [node-webkit](https://github.com/rogerwang/node-webkit).


## Installation
 
    $ npm install soundcontrol


## Usage

```js
// pause all audio players
sound.pauseAll();

// resume playback in previously paused audio player
sound.resume();

// you can also start playback in a specific app
sound.play('iTunes');

// there are also some utility methods that are used internally
// but are exposed as they may be useful such as:
sound.isItunesPlaying(function(err, playing){
    if (playing) console.log('iTunes is currently playing');
});

sound.isSpotifyOpen(function(err, open){
    if (open) console.log('Spotify is currently open');
});
```


## License

This module is Copyright Sqwiggle 2013.

SoundControl is released under the MIT license. It is simple and easy to understand and places almost no restrictions on what you can do with the software. [More Information](http://en.wikipedia.org/wiki/MIT_License)