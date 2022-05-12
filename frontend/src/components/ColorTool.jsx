import { useState } from "react"

function ColorTool({ canvasRef, contextRef }) {

  const [color, setColor] = useState('#000000')

  const colorChange = (e) => {
    let newColor = e.target.id === 'picker' ? e.target.value : e.target.id
    let context = canvasRef.current.getContext('2d')

    context.strokeStyle = newColor
    contextRef.current = context

    setColor(newColor)
  }

  const defaultColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFC600', '#800080', '#000000', '#FFFFFF', '#808080']

  return (
    <div className="tool">
      <p>COLOR</p>
      <div className="toolContainer">
        {defaultColors.map((color) => {
          return <button style={{ backgroundColor: color }} id={color} onClick={colorChange} key={color}></button>
        })}
        <input id='picker' type='color' onChange={colorChange} value={color} />
      </div>

    </div>
  )
}
export default ColorTool