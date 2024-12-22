import "./Header.css";
import InteractiveBoard from './InteractiveBoard.js'

function Header() {
  return (
    <header>
      <div className="header">
        <h1 className="heading">Tic Tac Toe</h1>
      </div>
      <section>
      <section className="aboutContainer">
        <h1 className="aboutTitle">About</h1>
        <p>
          Tic Tac Toe is a simple yet addictive game where two players take turns marking X's and O's on a 3x3 grid. <br/>
          The player who manages to place three of their marks in a row, column, or diagonal wins the game. <br/>
          Challenge your friends in this web version to see who comes out on top! <br/>
        </p>
      </section>
      <section className = "interactiveBoardContainer">
        <InteractiveBoard/>
      </section>
      </section>
    </header>
  );
}

export default Header;
