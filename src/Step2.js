import { useContext, useState } from 'react';
import { LyricsContext } from './App';
import './App.scss';

// 두번째 화면: 카운트 시작할 수 있도록 start 버튼
// 버튼 누르면 10초 중 랜덤한 시간에 5분의 1초간 가사가 반짝였다가 사라짐!

function Step2() {
  const { line1, line2, line3, goNext, setGoNext } = useContext(LyricsContext);

  const [start, setStart] = useState(false);
  const [blink, setBlink] = useState('white');

  function blinkTimer() {
    setTimeout(() => {
      setBlink('black');
    }, 7000);
    setTimeout(() => {
      setBlink('white');
    }, 7200);
  };

  return (
    <div className={goNext ? "Step2" : "none"}>
      <button className={start ? "none" : "startButton"} onClick={() => { setStart(true); blinkTimer(); }}> 시작!</button>
      <button className="backButton" onClick={() => { setStart(false); setGoNext(!goNext); }}>〈〈 뒤로가기</button>
      <div className="gameStart">
        <div>
          {line1.map((letter, i) => {
            return (<span key={i} className={(i % 3 === 0) ? `${blink} orange` : (i % 3 === 1) ? `${blink} yellow` : `${blink} blue`}>{letter}</span>)
          })}
        </div>
        <div>
          {line2.map((letter, i) => {
            return (<span key={i} className={(i % 3 === 0) ? `${blink} yellow` : (i % 3 === 1) ? `${blink} orange` : `${blink} blue`}>{letter}</span>)
          })}
        </div>
        <div>
          {line3.map((letter, i) => {
            return (<span key={i} className={(i % 3 === 0) ? `${blink} blue` : (i % 3 === 1) ? `${blink} orange` : `${blink} yellow`}>{letter}</span>)
          })}
        </div>
      </div>

    </div>
  );
}

export default Step2;
