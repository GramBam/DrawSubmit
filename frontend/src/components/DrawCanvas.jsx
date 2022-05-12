import { useEffect, useRef, useState } from "react"

function DrawCanvas({ canvasRef, contextRef }) {
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

  return (
    <canvas
      onMouseDown={drawStart}
      onMouseUp={drawEnd}
      onMouseMove={draw}
      ref={canvasRef}
    />
  )
}
export default DrawCanvas