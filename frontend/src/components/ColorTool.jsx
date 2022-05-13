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

  const getBorder = (c) => {
    if (c === '#000000' && c === color) {
      return '3px solid #FFF'
    } else {
      return color === c ? '3px solid #000' : 'none'
    }
  }

  return (
    <div className="tool">
      <p>COLOR</p>
      <div className="toolContainer">
        {defaultColors.map((c) => {
          return <button style={{ backgroundColor: c, border: getBorder(c) }} id={c} onClick={colorChange} key={c}></button>
        })}
        <input id='picker' type='color' onChange={colorChange} value={color} />
      </div>

    </div>
  )
}
export default ColorTool