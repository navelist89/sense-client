import sys
import os.path
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

from cochlearai.client.sense import CochlearaiSenseApp
from pprint import pprint
import json


apikey = 'your-api-key'


app = CochlearaiSenseApp()
sensers = app.get_sensers()


# example 1: music tempo estimation 

# Music from Jukedeck - create your own at http://jukedeck.com
filename = 'Wistful Fear.mp3'
task = 'tempo'
res = sensers.predict(apikey, filename, task)
pprint(json.loads(res.pred))



# example 2: audio event detection (babycry)

filename = 'example_event.mp3'
task = 'event'
subtask = 'babycry'
res = sensers.predict(apikey, filename, task, subtask)
pprint(json.loads(res.pred))