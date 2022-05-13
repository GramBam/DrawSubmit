import PicItem from "./PicItem";

function PicsDisplay({ pics }) {
  return (
    <div className="picContainer">
      {pics.map((pic, i) => { return <PicItem src={pic.dataURL} timestamp={pic.createdAt} key={i} title={pic.title} /> })}
    </div>
  )
}
export default PicsDisplay