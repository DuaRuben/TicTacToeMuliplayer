import React from 'react'
import InteractiveBoard from "./InteractiveBoard"
import "./About.css"

function About() {
  return (
    <div>
        <section className = "abtSection">
        <section className="aboutContainer">
          <h1 className="aboutTitle">About</h1>
          <p>
            Tic Tac Toe is a timeless game loved by players of all ages. Two players alternate turns, placing X's and O's on a 3x3 grid, with the goal of aligning three marks horizontally, vertically, or diagonally. <br />
            This web-based version brings the excitement of Tic Tac Toe to your fingertips. Compete with friends or family and showcase your strategic skills. Who will emerge victorious? <br />
            Ready to play? Let the challenge begin!
          </p>
        </section>
        <section className = "interactiveBoardContainer">
          <InteractiveBoard/>
        </section>
      </section>
    </div>
  )
}

export default About