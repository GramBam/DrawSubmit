function PicItem({ src, timestamp, title }) {
  const date = new Date(timestamp)
  const dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

  const getTimeString = () => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
  }

  return (
    <div className="picItem">
      <p>{title}</p>
      <img src={src} alt="Pic" />
      <p>{dateString + ' - ' + getTimeString()}</p>
    </div>
  )
}
export default PicItem