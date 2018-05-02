# Cochlear.ai Sense (alpha version)

## Getting Started 

**Cochlear.ai** offers audio cognition systems as a service. Sense API enables developers to analyze audio contents by extracting non-verbal information. It is based on gRPC framework and only python is supported in alpha version.

Response speed of the API is quite slow at the moment which will be our first issue to be solved during alpha phase. If you need any help or support, please do not hesitate to send us email at support@cochlear.ai.

Send us audio samples that are not working properly or tell us any issue during  development would be greatly appreciated. Thank you for your participation!


### Available task

        'key' (music key detection)
        'tempo' (music tempo detection)
        'genre' (music genre detection)
        'mood' (music mood estimation)
        'gender' (speech gender classification)
        'mso' (music/speech/others classification)
        'event' (audio event detection)
    
        in case of 'event', the following subtasks are available.
            ('babycry', 'carhorn', 'cough', 'dogbark', 'siren', 'snoring')
            if task is not 'event', subtask input will be ignored.


## Quick Tutorial

In this short tutorial, we introduce **Cochlear.ai Sense API** and go through the process of analyzing your first audio contents.



### Step 1. Get your Free API key

All API access is under API key and if you are first time user, ask support@cochlear.ai to get your free API key.

Every API key will be limited to 100 calls per method a day and expired after 30 days. If you need extra quota, email support@cochlear.ai to get more quota with brief explanation.


        Daily Quota : 100 calls per method (3000 calls per method during alpha testing)


### Step 2. Setup your environment

- python 2.7 version
- pip required

-- wget https://bootstrap.pypa.io/get-pip.py

-- python get-pip.py

-- In ubuntu, you can 
    apt-get install python-pip


#### (Optional) If you want to set pip environment on virtualenv

-- pip install virtualenv

-- virtualenv venv 

-- . venv/bin/activate

- venv is activated. you must use pip within this venv


#### Common Settings for Development&runtime environment on base OS

-- pip install --upgrade pip==10.0.1

-- pip install --no-cache-dir -r requirements.txt



### Step 3. Making your gRPC call

Every prediction except music analysis ('key', 'tempo', 'genre') is based on 1 second decision unit. Your audio input should not be exceeded by 30 seconds length and 4MB size.

The prediction works only what model you run the input through. For example, if you call the music analysis method with speech content, models will returns the predictions that music analysis model knows about.

#### Example of Request

For more examples, please refer /example/example.py and simple_example.py.

        import sys
        sys.path.append('path-of-cochlearai-package')
        from cochlearai.client.sense import CochlearaiSenseApp

        apikey = 'your-api-key'

        app = CochlearaiSenseApp()
        sensers = app.get_sensers()

        filename = 'example_event.mp3'
        task = 'event'
        subtask = 'babycry'
        res = sensers.predict(apikey, filename, task, subtask)




#### Example of Response

- Audio Event Detection

        {u'babycry': [0.884, 1.0, 0.126, 0.0, 0.0, 0.058, 0.416, 0.948, 0.782, 0.013]}
        
- Audio Music/Speech/Others (MSO) Classification

        {u'music': [0.0, 0.0, 0.0, 0.001, 0.001, 0.086, 0.0, 0.0, 0.001, 0.008],
         u'others': [1.0, 1.0, 1.0, 0.998, 1.0, 0.965, 1.0, 1.0, 1.0, 0.865],
         u'speech': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.004]}

- Speech Gender Detection and Classification

        {u'male': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
         u'female': [0.0, 0.0, 0.0, 1.0, 1.0, 0.257, 0.0, 0.0, 0.173, 0.935]}

- Music Key Estimation

        {u'key': u'Abm'}

- Music Tempo Estimation

        {u'tempo1': 128.571, u'tempo2': 42.857}
        
- Music Genre Classification

        {u’genre’: [u’Electronic’]}
        
- Music Mood Estimation

        {u'arousal': [-0.035, 0.058, -0.028, 0.22, 0.099, -0.038, -0.089, -0.049, 0.084, -0.01],
         u'valence': [0.01, 0.046, 0.006, 0.174, 0.068, 0.019, -0.01, -0.02, 0.092, -0.027]}




## Updating components in alpha testing

- HTTP referrers (REST API)
- Improvement on API Latency 
- Example client codes of other languages (C++, Java, Objective-c, cURL)
- Updated inference model
