import { useContext } from 'react';
import { LyricsContext } from './App';
import logo from './logo.png';
import './App.scss';

// 첫 화면: input으로 가사 입력할 수 있도록 함
// 친구들이 사용하기 때문에 어떻게 나오는지도 미리보기가 있어야 할 듯
// -> OK 클릭

function Step1() {
    const { random, line1, line2, line3, goNext, setRandom, setLine1, setLine2, setLine3, setGoNext } = useContext(LyricsContext);

    const getAllLyrics = (e) => {
        let str = e.target.value.replace(/\n/g, ''); // 문자열 줄바꿈 제거
        makeRandom(str); // 랜덤화 함수

        let lines = e.target.value.split(/\n/); // 한 줄씩 나눠서 저장
        countLines(lines);  // 한 줄에 몇글자 있는지 카운트하기
    }

    const makeRandom = (lyrics) => {
        // 배열로 만들어서 랜덤화
        let array = lyrics.split('');
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            let x = array[i];
            array[i] = array[j];
            array[j] = x;
        }

        let result = [];
        array.map((ele) => {
            // 띄어쓰기 제거
            if (ele !== " ") result.push(ele);
            return result;
        })
        // 최종적으로 state 수정!
        setRandom(result);
    }

    // 랜덤시킨 글자들을 한줄씩 글자 수에 맞춰 다시 slice해서 나누어야함
    const countLines = (lines) => {
        let count = lines.map(line => line.replace(/\s/g, '').length);  // [3, 4, 5]
        setLine1(random.slice(0, count[0]));
        setLine2(random.slice(count[0], count[0] + count[1]));

        if (count[2]) {
            setLine3(random.slice(count[0] + count[1], count[0] + count[1] + count[2]));
        } else {
            setLine3([]);
        }
        console.log(line1, line2, line3);
    }

    return (
        <div className={goNext ? "none" : "Step1"}>

            <div className="title">
                <img src={logo} style={{ width: "127px", height: "103px" }}></img>
                <div className="inputArea">
                    <span>안보이게 조심!! 줄 바꿈 엔터 쳐주세용</span>
                    <button className="button" onClick={() => setGoNext(!goNext)}>OK!</button>
                    <textarea placeholder="가사를 입력해주세요." onChange={getAllLyrics} />
                </div>
            </div>

            <div className="preview">
                <div>미리보기:</div>
                <div>
                    {line1.map((letter, i) => {
                        return (<span key={i} className={(i % 3 === 0) ? "orange" : (i % 3 === 1) ? "yellow" : "blue"}>{letter}</span>)
                    })}
                </div>
                <div>
                    {line2.map((letter, i) => {
                        return (<span key={i} className={(i % 3 === 0) ? "yellow" : (i % 3 === 1) ? "orange" : "blue"}>{letter}</span>)
                    })}
                </div>
                <div>
                    {line3.map((letter, i) => {
                        return (<span key={i} className={(i % 3 === 0) ? "blue" : (i % 3 === 1) ? "orange" : "yellow"}>{letter}</span>)
                    })}
                </div>
            </div>

        </div>
    );
}

export default Step1;
