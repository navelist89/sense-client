# Cochlear.ai sense Java Client (alpha version)


## Making a call
Example)

        import com.cochlear.ai.CochlearSenseClient;

        public class runner {

          public static void main(String[] args) throws Exception{
            CochlearSenseClient client = new CochlearSenseClient("[YourApiKey]");



            System.out.println(client.senseEvent("example_event.mp3", "babycry"));
            System.out.println(client.senseGender("example_event.mp3"));
            System.out.println(client.senseKey("example_event.mp3"));
            System.out.println(client.senseTempo("example_event.mp3"));
            System.out.println(client.senseGenre("example_event.mp3"));
            System.out.println(client.senseMood("example_event.mp3"));
            System.out.println(client.senseMSO("example_event.mp3"));



          }
        }


You can get InputStream as parameter - considerations for Android
Example)


        client.senseKey(filename, (InputStream) new FileInputStream(filename));
        client.senseEvent(filename, (InputStream) new FileInputStream(filename), subtask);

1. Import CochlearSenseClient class from com.cohlear.ai package path
2. Create the object using CochlearSenseClient(String) constructor, your apikey as a parameter
3. Call a method, with an file name or path as a String parameter
 For event detection task, you have to put 'subtask' string as a second parameter
4. Return is given as json string, in the type of Java native String class
