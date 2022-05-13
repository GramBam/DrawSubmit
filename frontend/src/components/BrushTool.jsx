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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => {
          return (
            <button id={s.toString()} onClick={brushChange} key={s} >
              <span id={s.toString()} className="dot" style={{ width: s * 3, height: s * 3 }}></span>
            </button>
          )
        })}
        <input style={{ width: `${50}px`, border: '2px solid' }} id='picker' type='number' value={size} onChange={brushChange}></input>
      </div>

    </div>
  )
}
export default BrushTool