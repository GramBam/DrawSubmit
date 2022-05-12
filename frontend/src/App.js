import { useRef, useEffect, useState } from "react";
import axios from 'axios'

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [pics, setPics] = useState();

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.width = `${window.innerWidth / 2}px`
    canvas.style.height = `${window.innerHeight / 2}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context

    const getPics = async () => await axios.get('/api/entries/')
      .then(res => {
        setPics(res);
      })
    getPics();
  }, [])


  const drawStart = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    setDrawing(true)
  }

  const drawEnd = () => {
    contextRef.current.closePath()
    setDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!drawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const colorChange = (e) => {
    const context = canvasRef.current.getContext('2d')
    context.strokeStyle = e.target.id
    contextRef.current = context
  }

  const brushChange = (e) => {
    const context = canvasRef.current.getContext('2d')
    context.lineWidth = parseInt(e.target.id)
    contextRef.current = context

  }

  const saveImage = async () => {
    const canvas = canvasRef.current
    let image = canvas.toDataURL('image/jpeg');
    await axios.post('/api/entries/', { dataURL: image })
  }

  const clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <div className="main">
        <nav>
          <button id='black' onClick={colorChange}>BLACK</button>
          <button id='blue' onClick={colorChange}>BLUE</button>
          <button id='red' onClick={colorChange}>RED</button>
          <button id='white' onClick={colorChange}>ERASER</button>
          <button id='20' onClick={brushChange}>Big Brush</button>
          <button id='3' onClick={brushChange}>Small Brush</button>
          <button onClick={clear}>Clear</button>
          <button onClick={saveImage}>Submit</button>
          <button onClick={() => console.log(pics.data)}>LOG DATA</button>
        </nav>
        <div>
          {/* {pics.data.map((pic) => (<img src={pic.dataURL} key={pic._id} />))} */}
        </div>
        <canvas
          onMouseDown={drawStart}
          onMouseUp={drawEnd}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </div>
    </>

  );
}

export default App;
