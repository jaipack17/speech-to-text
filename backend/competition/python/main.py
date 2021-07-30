import speech_recognition


import record

time = 5

recognizer = speech_recognition.Recognizer()
recordeing = 'outpoot.wav'

while True:
    File_read = open("notes.txt","r")
    f= File_read.readline()
    File_read.close()
    if f == "true":
        record.my_function(time)

        with speech_recognition.AudioFile(recordeing) as source:
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.record(source)
            print("file reading")

        print("the text is")
        try:
            fileappend = open('text.txt', 'a')
            text = recognizer.recognize_google(audio)
            with fileappend as f:
                f.write(f" .{text}")
            print(text)
            fileappend.close()
        except Exception as e:
            print(e)