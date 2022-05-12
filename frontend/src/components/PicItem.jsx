function PicItem({ src, time }) {

  const date = new Date(time)
  const dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
  return (
    <div className="picItem">
      <img src={src} alt="Pic" />
      <p>{dateString}</p>
    </div>
  )
}
export default PicItem