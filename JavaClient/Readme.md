# Cochlear.ai sense Java Client (alpha version)

## Importing sdk into your java project

Currently we do not support maven or gradle repository.

Just download "CochlearSense.jar", which, includes all the sdk classes and other dependencies (such as grpc io, etc..)

Import CochlearSense.jar file into your project, and add it as your project build path.

In case of eclipse java project, [right click on CochlearSense.jar -> Build Path -> Add to Build Path]

## Using SDK

### predict file (non-streaming)
For non streaming case, you should use CochlearSenseClient class
```java
CochlearSenseClient cs = new CochlearSenseClient("35.236.162.35", 9000, "YoUrApiKEyMustBeHERE");
```
Constructor requires ip addres of our server, port (must be 9000), and your api key. Each of type String, int and String.

You must give file as a Java InputStream object to our sdk object.

```java
String filename = "Wistful Fear.wav";

File file = new File(filename);
InputStream in = new FileInputStream(file);

String res = cs.senseEvent(in, "babycry", "wav");
```

CochlearSenseClient have following methods


```java
String senseEvent(InputStream is, String subtask, String format)

String senseMusicKey(InputStream is, String format)

String senseMusicTempo(InputStream is, String format)

String senseMusicGenre(InputStream is, String format)

String senseMusicMood(InputStream is, String format)

String senseMusicDetector(InputStream is, String format)

String senseSpeechDetector(InputStream is, String format)
```

Most of the require InputStream for the file, and format (such as "wav" or "mp3") as an argument.
Note that specifically, senseEvent requires 'subtask' String as a second argument.

```java
String res = cs.senseEvent(in, "babycry", "wav");
System.out.println(res);
```
Simply get a String returned from the method call, and try printing out.




### predict streaming

For streaming prediction, you must use CochlearSenseStreamClient class.

```java
CochlearSenseStreamClient cs = new CochlearSenseStreamClient("35.236.162.35", 9000, "YoUrApiKEyMustBeHERE");
```

Predict methods require AudioInputStream java obeject as a single parameter.

We will demonstrate two ways to get AudioInputStream.

#### AIS from file

```java
String filename = "Wistful Fear.wav";

File file = new File(filename);
AudioInputStream ais= AudioSystem.getAudioInputStream(file);
```

Precisely speaking, using streaming prediction for file like above, is almost meaningless. As we provide simpler api for file prediction.

#### AIS from microphone

```java
AudioFormat format = new AudioFormat(44100, 16, 2, true, true);
DataLine.Info tinfo = new DataLine.Info(TargetDataLine.class, format);
TargetDataLine microphone = (TargetDataLine)AudioSystem.getLine(tinfo);
AudioInputStream ais = new AudioInputStream(microphone);
```


Now calling predict method and returning streamed response are as follows

```java
cs.senseSpeechDetectorStream(ais); // Send call

for (String result:cs){
    System.out.println(result);
}
```
Note that CochlearSenseStreamClient itself works as a Python generator(The thing that uses 'yields' statemet). The object itself returns the iterator for the String typed result.

List of the streamed client methods are as follows

```java
CochlearSenseStreamClient senseEventStream(AudioInputStream is, String subtask)

CochlearSenseStreamClient senseAgeGenderStream(AudioInputStream is)

CochlearSenseStreamClient senseMusicGenreStream(AudioInputStream is)

CochlearSenseStreamClient senseMusicMoodStream(AudioInputStream is)

CochlearSenseStreamClient senseMusicDetectorStream(AudioInputStream is)

CochlearSenseStreamClient senseSpeechDetectorStream(AudioInputStream is)
```

Also note that senseEventStream method also requires additional string parameter 'subtask'

#### Java builder like usage of streaming client

```java
CochlearSenseStreamClient cs = new CochlearSenseStreamClient("35.236.162.35", 9000, apiKey)
                .senseSpeechDetectorStream(in);

for(String out : cs) {
        System.out.println(out);
}
```

Streaming client supports builder code as above.




## Further

This sdk was compiled and tested under Java 1.8 version. Precedding Java versions (such as Java 1.7) may not be supportive.
