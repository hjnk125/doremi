import React, { createContext, useState } from 'react';
import './App.scss';
import Step1 from './Step1';
import Step2 from './Step2';

// 첫 화면: input으로 가사 입력할 수 있도록 함
// 친구들이 사용하기 때문에 어떻게 나오는지도 미리보기가 있어야 할 듯
// -> OK 클릭
// 두번째 화면: 카운트 시작할 수 있도록 start 버튼
// 버튼 누르면 10초 중 랜덤한 시간에 5분의 1초간 가사가 반짝였다가 사라짐!

export const LyricsContext = createContext({
  random: [], setRandom: () => { },
  line1: [], setLine1: () => { },
  line2: [], setLine2: () => { },
  line3: [], setLine3: () => { },
  goNext: false, setGoNext: () => { }
});

function App() {
  const [random, setRandom] = useState([]);

  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);

  const [goNext, setGoNext] = useState(false);

  return (
    <div className="App">
      <LyricsContext.Provider value={{ random, line1, line2, line3, goNext, setRandom, setLine1, setLine2, setLine3, setGoNext }}>
        {(window.matchMedia('(orientation: portrait)').matches) ?
          // Portrait 모드로 접속한 경우 알림창을 띄움
          (<div className="landscapeAlert" onClick={(e) => document.querySelector(".landscapeAlert").className = "none"}>
            <div>
              <button >✗</button>
            💡Tip</div>
            <div>화면을 가로로 돌려 사용하는 것을 추천합니다!</div>
          </div>) : <></>
        }
        <Step1 />
        <Step2 />
      </LyricsContext.Provider>
    </div>
  );
}

export default App;
