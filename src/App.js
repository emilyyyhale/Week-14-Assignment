import './App.css';
import movieListData from './App-Components/Movie-List';
import MovieData from './App-Components/Movie-Data';


function App() {
  const movieList = movieListData.map(movie => {
    return (
      <MovieData
        key={movie.id}
        movie={movie}
      />
    )
  })
  return (
    <div className="App">
      <div className="container">
        <h1>Have you seen this movie? Leave your review below!</h1>
        <section className="card-container">{movieList}</section>
      </div>
    </div>
  );
}

export default App;
