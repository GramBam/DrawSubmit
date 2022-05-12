import { useState } from "react"

function ColorTool({ canvasRef, contextRef }) {

  const [color, setColor] = useState('black')

  const colorChange = (e) => {
    let newColor = e.target.id === 'picker' ? e.target.value : e.target.id
    setColor(newColor)
    const context = canvasRef.current.getContext('2d')
    context.strokeStyle = newColor
    contextRef.current = context
  }

  const brushChange = (e) => {
    const context = canvasRef.current.getContext('2d')
    context.lineWidth = e.target.value
    contextRef.current = context
  }

  const defaultColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFC600', '#800080', '#000000', '#FFFFFF', '#808080']

  return (
    <div className="colorTool">
      {/* <input type='number' onChange={brushChange} /> */}
      <p>COLOR</p>
      <div className="colorContainer">
        {defaultColors.map((color) => {
          return <button style={{ backgroundColor: color }} id={color} onClick={colorChange}></button>
        })}
        <input id='picker' type='color' onChange={colorChange} value={color} />
      </div>

    </div>
  )
}
export default ColorTool