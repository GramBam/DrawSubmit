import { useState } from "react"

function BrushTool({ canvasRef, contextRef }) {

  const [size, setSize] = useState(5)

  const brushChange = (e) => {
    let newSize = e.target.id === 'picker' ? e.target.value : e.target.id
    let context = canvasRef.current.getContext('2d')

    context.lineWidth = newSize
    contextRef.current = context

    setSize(newSize)
  }

  return (
    <div className="tool">
      <p>Brush Size</p>
      <div className="toolContainer">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((size) => {
          return (
            <button id={size.toString()} onClick={brushChange} key={size} >
              <span id={size.toString()} className="dot" style={{ width: size * 3, height: size * 3 }}></span>
            </button>
          )
        })}
        <input style={{ width: `${50}px`, border: '2px solid' }} id='picker' type='number' value={size} onChange={brushChange}></input>
      </div>

    </div>
  )
}
export default BrushTool