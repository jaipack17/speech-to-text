import '../App.css';
import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Home() {
  const [recording, setRecording] = useState(false);
  const [dialogues, setDialogues] = useState([]);

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="App">
      <header className="App-header">
        Speech to Text.
      </header>
      <header className="App-header-bottom">
        A quick and easy way to understand those who are talking to you :)
      </header>
      <img src="https://imgur.com/fmliy6V.png" alt="trees" className="trees"></img>
      <br/>
      <br/>
      <header className="App-center">
        <div>{dialogues.map(entry =>
          <h2 className="transcript">
            "{entry}"
          </h2>
        )}
        </div>
        {
          !recording ? <button className="record" onClick={
            () => {
              setRecording(!recording)
              SpeechRecognition.startListening()
            }
          }>▶</button> 
          
          : <><button className="record-2" onClick={
            () => {
              setRecording(!recording)
              SpeechRecognition.stopListening()
              if (transcript.length !== 0) {
                setDialogues([...dialogues, transcript]);
              } 
            }
          }>■</button>
          </>
        }
        {
          recording ? <h2 id="status" className="time">Stop</h2> : <h2 className="time" >Start</h2>
        }
        <div className="credits">
            <h4>
              Backend developed by vatsal and Frontend by jaipack17
              <br/>
              <a href="https://github.com/jaipack17/speech-to-text" target="_blank" rel="noreferrer">view source code - github</a>
            </h4>
        </div>
        <br/>
      </header>
    </div>
  );
}

export default Home;
