function PicDisplay({ pics }) {
  console.log(pics, 'hello');
  return (
    <div className="picContainer">
      {pics.map((pic, i) => { return <img src={pic.dataURL} key={i} alt="Pic" /> })}
    </div>
  )
}
export default PicDisplay