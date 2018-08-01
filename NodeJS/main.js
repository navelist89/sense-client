var CochlearSense = require('./client/CochlearSense')

function main() {
    function generalCallback(err, result){
        if(err)
            console.log(err);
        else
            console.log(result);
    }
    var client = CochlearSense('YourApiKey');
    client.senseKey('./example_event.mp3', generalCallback);
    //client.senseEvent('./example_event.mp3', "babycry", generalCallback);
    /*
    client.senseMood('./example_event.mp3', generalCallback);
    client.senseGenre('./example_event.mp3', generalCallback);
    client.senseGender('./example_event.mp3', generalCallback);
    client.senseTempo('./example_event.mp3', generalCallback);
    client.senseMSO('./example_event.mp3', generalCallback);
    */
}
main();