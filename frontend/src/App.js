import axios from 'axios'
import { useRef, useEffect, useState } from "react";
import PicsDisplay from "./components/PicsDisplay";
import DrawCanvas from "./components/DrawCanvas";
import ColorTool from "./components/ColorTool";
import BrushTool from "./components/BrushTool";

function App() {
  const [pics, setPics] = useState();
  const [picsLoaded, setPicsLoaded] = useState(false);
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  useEffect(() => {
    const getPics = async () => await axios.get('/api/entries/')
      .then(res => {
        setPics(res.data.reverse());
        setPicsLoaded(true)
      })
    getPics();
  }, [])

  const submit = async () => {
    const canvas = canvasRef.current
    let image = canvas.toDataURL('image/png');
    await axios.post('/api/entries/', { dataURL: image })
    await axios.get('/api/entries/').then(res => setPics(res.data.reverse()))
  }

  const clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <div className="main">
        <div className="toolsAndCanvas">
          <ColorTool canvasRef={canvasRef} contextRef={contextRef} />
          <DrawCanvas canvasRef={canvasRef} contextRef={contextRef} />
          <BrushTool canvasRef={canvasRef} contextRef={contextRef} />
        </div>

        <div className="options">
          <button onClick={clear}>CLEAR</button>
          <button onClick={submit}>SUBMIT</button>
        </div>

        {picsLoaded && <PicsDisplay pics={pics.reverse()} />}
      </div>
    </>

  );
}

export default App;
