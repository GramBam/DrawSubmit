import { useRef, useEffect, useState } from "react";
import axios from 'axios'
import PicsDisplay from "./components/PicsDisplay";
import DrawCanvas from "./components/DrawCanvas";
import ColorTool from "./components/ColorTool";

function App() {
  const [pics, setPics] = useState();
  const [picsLoaded, setPicsLoaded] = useState(false);
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  useEffect(() => {
    const getPics = async () => await axios.get('/api/entries/')
      .then(res => {
        setPics(res.data);
        setPicsLoaded(true)
      })
    getPics();
  }, [])

  const saveImage = async () => {
    const canvas = canvasRef.current
    let image = canvas.toDataURL('image/png');
    await axios.post('/api/entries/', { dataURL: image })
    const getPics = async () => await axios.get('/api/entries/')
      .then(res => {
        setPics(res.data);
        setPicsLoaded(true)
      })
    getPics();
  }

  const clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <div className="main">
        {/* <nav>
          <button id='black' onClick={colorChange}>BLACK</button>
          <button id='blue' onClick={colorChange}>BLUE</button>
          <button id='red' onClick={colorChange}>RED</button>
          <button id='white' onClick={colorChange}>ERASER</button>
          <button id='20' onClick={brushChange}>Big Brush</button>
          <button id='3' onClick={brushChange}>Small Brush</button>
          <button onClick={clear}>Clear</button>
          <button onClick={saveImage}>Submit</button>
        </nav> */}

        <div className="toolsAndCanvas">
          <ColorTool canvasRef={canvasRef} contextRef={contextRef} />
          <DrawCanvas canvasRef={canvasRef} contextRef={contextRef} />
          <ColorTool canvasRef={canvasRef} contextRef={contextRef} />
        </div>

        {picsLoaded && <PicsDisplay pics={pics.reverse()} />}
      </div>
    </>

  );
}

export default App;
