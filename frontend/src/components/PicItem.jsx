import axios from "axios";

function PicItem({ src, timestamp, title }) {
  const date = new Date(timestamp)
  const dateString = date.getDate() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getFullYear()

  const getTimeString = () => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
  }

  const openImg = (e) => {
    // if (e.button === 3) {
    //   axios({ method: 'DELETE', url: '/api/entries/delete', params: { createdAt: timestamp } })
    //   return
    // }
    const base64ImageData = src;
    const contentType = 'image/png';
    const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);

    let x = window.open(blobUrl, '_blank');
    x.addEventListener("load", () => x.document.getElementsByTagName("img")[0].style.backgroundColor = "#FFFFFF");
  }

  return (
    <div className="picItem">
      <p>{title}</p>
      <img id='PicItem' src={src} alt="Pic" style={{ cursor: 'pointer' }} onClick={openImg} />
      <p>{dateString + ' - ' + getTimeString()}</p>
    </div>
  )
}
export default PicItem