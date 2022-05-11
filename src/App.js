import { useRef, useEffect, useState } from "react";

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [drawing, setDrawing] = useState(false)

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
  }, [])


  const drawStart = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
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

  const saveImage = () => {
    const canvas = canvasRef.current
    let image = canvas.toDataURL('image/jpeg');
    console.log(image);
  }

  const clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <container>
        <nav>
          <button id='black' onClick={colorChange}>BLACK</button>
          <button id='blue' onClick={colorChange}>BLUE</button>
          <button id='red' onClick={colorChange}>RED</button>
          <button id='white' onClick={colorChange}>ERASER</button>
          <button id='20' onClick={brushChange}>Big Brush</button>
          <button id='3' onClick={brushChange}>Small Brush</button>
          <button onClick={clear}>Clear</button>
          <button onClick={saveImage}>Submit</button>
        </nav>

        <canvas
          onMouseDown={drawStart}
          onMouseUp={drawEnd}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </container>
    </>

  );
}

export default App;
