import React, {useState, useEffect} from "react";
import PigSVG from "./components/PigSVG"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
      setIsLoading(true);
      setError(false);
      const fetchData = async () => { 
        try {
          if (url !== null ) {
            const response = await fetch(url); 
            const data  = await response.json();
            setTranslation(data.contents.translated);
          }
        }
        catch {
          setError(true)
        }
        setIsLoading(false);
      }
      fetchData();
  
  }, [url])

  return (
    <div className="App">
       <PigSVG />
      <div className="container">
          <div className="to-translate-box">
            <textarea  placeholder="Enter text here..." value={text} onChange={ e => setText(e.target.value)}/>
            <button type="button" onClick={() => setUrl(`https://api.funtranslations.com/translate/pig-latin.json?text=${text}`)}>Translate</button>
          </div> 
          <div className="translation-box">
            {isLoading || error ? "Loading..." : translation}
          </div>
        </div>
    </div>
  );
}

export default App;
