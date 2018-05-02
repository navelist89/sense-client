import grpc
import argparse

from ..common import cochlear_sense_pb2
from ..common import cochlear_sense_pb2_grpc

class CochlearaiSenseApp(object):
    def __init__(self, host='sense.cochlear.ai:9000'):
        self.auth = True
        self.host = host
        self.sensers = Sensers(self.auth, self.host)        
    
    def get_sensers(self):
        return self.sensers
    
class Sensers(object):
    def __init__(self, auth, host):
        self.host = host
    
    def predict(self, apikey, filename, task, subtask=None):

        channel = grpc.insecure_channel(self.host)
        stub = cochlear_sense_pb2_grpc.cochlear_senseStub(channel)
    
        a = open(filename,'rb')
        data = a.read()        
        
        ext = filename.split(".")[-1]
        ext = str(len(ext))+ext
        
        data = ext+data

        metadata = []
        metadata.append(('x-api-key',apikey))

        task_input = cochlear_sense_pb2.input(data=data,subtask=subtask,apikey=apikey)
       
        if task=='event':
            response = stub.event_detection(task_input,metadata=metadata)
        elif task=='gender':
            response = stub.gender_detection(task_input,metadata=metadata)
        elif task=='key':
            response = stub.key_detection(task_input,metadata=metadata)
        elif task=='tempo':
            response = stub.tempo_detection(task_input,metadata=metadata)
        elif task=='genre':
            response = stub.genre_detection(task_input,metadata=metadata)
        elif task=='mood':
            response = stub.mood_detection(task_input,metadata=metadata)
        elif task=='mso':
            response = stub.music_speech_others_detection(task_input,metadata=metadata)

        return response
