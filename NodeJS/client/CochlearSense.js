var grpc = require('grpc')


var fs = require('fs')
var path = require('path')
const Buffer = require('buffer').Buffer;

var PROTO_PATH = __dirname + '/proto/cochlear_sense.proto'
var cochlear_sense = grpc.load(PROTO_PATH).cochlear.ai

var obj = new Object

function getBytesFromFile(filename){
    var stext = path.extname(filename).substring(1)
    var prefix = Buffer.from(stext.length + stext);
    var filedata = fs.readFileSync(filename);
    var bytes = Buffer.concat([prefix, filedata]);

    return bytes;
}

function createInput(filename, subtask){
    return {data:getBytesFromFile(filename),
        subtask:subtask,
        apikey:obj.apiKey
    }
}

obj['senseEvent'] = function(filename, subtask, callback){
    obj.client.event_detection(createInput(filename, subtask), callback);
}


obj['senseKey'] = function(filename, callback){
    obj.client.key_detection(createInput(filename), callback);
}

obj['senseMood'] = function(filename, callback){
    obj.client.mood_detection(createInput(filename), callback);
}

obj['senseGenre'] = function(filename, callback){
    obj.client.genre_detection(createInput(filename), callback);
}
obj['senseGender'] = function(filename, callback){
    obj.client.gender_detection(createInput(filename), callback);
}

obj['senseTempo'] = function(filename, callback){
    obj.client.tempo_detection(createInput(filename), callback);
}

obj['senseMSO'] = function(filename, callback){
    obj.client.music_speech_others_detection(createInput(filename), callback);
}


function __init__(apiKey, host){

    //Set api key
    obj.apiKey = apiKey;


    //Set host
    if(host)
        obj.host = host;
    else
        obj.host = 'sense.cochlear.ai:9000';

    
    obj.client = new cochlear_sense.cochlear_sense(obj.host,  grpc.credentials.createInsecure());    
    return obj;
}


module.exports = __init__;