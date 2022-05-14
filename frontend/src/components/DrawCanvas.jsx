import { useEffect, useState } from "react"

function DrawCanvas({ canvasRef, contextRef, cb }) {
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    let width = window.innerWidth < 800 ? 550 : window.innerWidth
    let height = window.innerWidth < 800 ? 600 : window.innerHeight
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width / 2}px`
    canvas.style.height = `${height / 2}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [canvasRef, contextRef])

  const drawStart = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    setDrawing(true)
    cb()
  }

  const drawEnd = () => {
    contextRef.current.closePath()
    setDrawing(false)
  }

  const draw = (e) => {
    if (!drawing) {
      return
    }
    const { offsetX, offsetY } = e.nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <canvas
      onPointerDown={drawStart}
      onPointerUp={drawEnd}
      onPointerMove={draw}
      ref={canvasRef}
      style={{ touchAction: 'none' }}
    />
  )
}
export default DrawCanvas