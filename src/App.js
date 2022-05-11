import { useRef, useEffect, useState } from "react";

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState('black')

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

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
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.strokeStyle = e.target.id
    contextRef.current = context
  }

  return (
    <>
      <button id='black' onClick={colorChange}>BLACK</button>
      <button id='blue' onClick={colorChange}>BLUE</button>
      <button id='red' onClick={colorChange}>RED</button>
      <canvas
        onMouseDown={drawStart}
        onMouseUp={drawEnd}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </>
  );
}

export default App;
