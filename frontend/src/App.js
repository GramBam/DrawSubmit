import axios from 'axios'
import { useRef, useEffect, useState } from "react";
import PicsDisplay from "./components/PicsDisplay";
import DrawCanvas from "./components/DrawCanvas";
import ColorTool from "./components/ColorTool";
import BrushTool from "./components/BrushTool";

function App() {
  const [pics, setPics] = useState();
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [picsLoaded, setPicsLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [index, setIndex] = useState(0)
  const [moreEntries, setMoreEntries] = useState(true)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const loadAmount = 21;

  useEffect(() => {
    const getPics = async () => await axios({ method: 'GET', url: '/api/entries/', params: { from: index, _limit: loadAmount } })
      .then(res => {
        setPics(res.data);
        setPicsLoaded(true)
        setIndex(loadAmount)
      })
    getPics();
  }, [])

  const submit = async () => {
    if (submitted) {
      return
    }
    const canvas = canvasRef.current
    let image = canvas.toDataURL('image/png');
    await axios.post('/api/entries/', { dataURL: image, title: title })
    setSubmitted(true)
    setIndex((prev) => prev += 1)
    await axios({ method: 'GET', url: '/api/entries/latest' }).then(res => setPics((prev) => [res.data, ...prev]))
  }

  const clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSubmitted(false)
    setTitle('')
  }

  const loadMoreItems = () => {
    setIsFetching(true);
    axios({
      method: "GET",
      url: "/api/entries/",
      params: { from: index, _limit: loadAmount },
    })
      .then((res) => {
        setPics((prev) => {
          return [...new Set([...prev, ...res.data])];
        });
        setIndex((prev) => prev += loadAmount)
        setIsFetching(false);
        setMoreEntries(res.data.length > 0)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="main">
        <div className="toolsAndCanvas">
          <ColorTool canvasRef={canvasRef} contextRef={contextRef} />
          <DrawCanvas canvasRef={canvasRef} contextRef={contextRef} cb={() => setSubmitted(false)} />
          <BrushTool canvasRef={canvasRef} contextRef={contextRef} />
        </div>

        <input type='text' className='titleInput' placeholder='TITLE' maxLength={12} onChange={(e) => { setTitle(e.target.value.toUpperCase()) }} value={title}></input>

        <div className="options">
          <button className='main-btn' onClick={clear}>CLEAR</button>
          <button className='main-btn' onClick={submit} style={{ cursor: submitted ? 'default' : 'pointer' }} >{submitted ? 'SUBMITTED!' : 'SUBMIT'}</button>
        </div>

        {picsLoaded && <PicsDisplay pics={pics} />}

        {isFetching && <p>Fetching items...</p>}
        {!isFetching && moreEntries && picsLoaded && (
          <button className='main-btn' onClick={loadMoreItems}>Load more</button>
        )}
      </div>
    </>

  );
}

export default App;
