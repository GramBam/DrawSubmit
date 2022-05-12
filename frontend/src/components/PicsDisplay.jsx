import PicItem from "./PicItem";

function PicsDisplay({ pics }) {

  return (
    <div className="picContainer">
      {pics.map((pic, i) => { return <PicItem src={pic.dataURL} time={pic.createdAt} key={i} /> })}
    </div>
  )
}
export default PicsDisplay