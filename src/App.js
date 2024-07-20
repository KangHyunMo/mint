/** @format */

import React, { useEffect, useState } from "react"
import "./App.css"
import ddang from "./assets/images/ddang.jpg"
import good from "./assets/images/good.jpg"
import ing from "./assets/images/ing.jpg"
import timeout from "./assets/images/timeout.jpg"

function App() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [result, setResult] = useState("")
  const [correct, setCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [intervalId, setIntervalId] = useState(null)
  const [background, setBackground] = useState(ing)
  useEffect(() => {
    generateQuestion()
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const id = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      setIntervalId(id)
    } else {
      setGameOver(true)
      setResult("시간 초과! 게임 오버!")
      setBackground(timeout)
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [timeLeft])

  const generateQuestion = () => {
    const randomNum1 = Math.floor(Math.random() * 9) + 1
    const randomNum2 = Math.floor(Math.random() * 9) + 1
    setNum1(randomNum1)
    setNum2(randomNum2)
    setUserAnswer("")
    setResult("")
    setCorrect(null)
    setTimeLeft(10 - Math.floor(score / 5)) // 점수에 따라 시간 감소 (최소 1초)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const answer = parseInt(userAnswer)
    if (answer === num1 * num2) {
      setResult("정답입니다!")
      setBackground(good)
      setCorrect(true)
      setScore(score + 1)
      clearInterval(intervalId)
      setTimeout(generateQuestion, 1000)
    } else {
      setResult("틀렸습니다.")
      setBackground(ddang)
      setCorrect(false)
      setGameOver(true)
      clearInterval(intervalId)
    }
  }

  const handleRestart = () => {
    setScore(0)
    setGameOver(false)
    setBackground(ing)
    generateQuestion()
  }

  return (
    <div className='App'>
      <div
        className='hero-container'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <h1
          style={{
            color: "#005ae7",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          강민트 무한 구구단
        </h1>
        {gameOver ? (
          <div>
            <h2>게임 오버!</h2>
            <p>최종 점수: {score}</p>
            <button onClick={handleRestart}>다시 시작</button>
          </div>
        ) : (
          <div>
            <div className='question'>
              {num1} x {num2} = ?
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type='number'
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder='답을 입력하세요'
                disabled={gameOver}
              />
              <button type='submit' disabled={gameOver}>
                확인
              </button>
            </form>
            {result && <div className='result'>{result}</div>}

            <p
              style={{ color: "black", fontSize: "1.5rem", fontWeight: "bold" }}
            >
              점수: {score}
            </p>
            <p style={{ color: "red", fontSize: "1.5rem", fontWeight: "bold" }}>
              남은 시간: {timeLeft}초
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
