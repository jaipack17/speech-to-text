import sounddevice as sd
import wavio as wv
def my_function(time):
    print("starting recording")
    recording = sd.rec(int(time * 44100), 
                    samplerate= 44100, channels=2)

    sd.wait()

    
    wv.write("outpoot.wav", recording, 44100, sampwidth=2)