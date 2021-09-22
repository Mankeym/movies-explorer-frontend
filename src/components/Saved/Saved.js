import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";
import Preloader from '../Preloader/Preloader';

function Saved(props) {
    console.log(props.movies)
    return(
        <main>
            <MoviesHeader />
            <Menu />
            <SearchForm onSearch={props.onSearch}

            />
            <MoviesCards movies={props.movies} setLike={props.saveMovie} setDislike={props.deleteMovie} fromSaved={true}  />
            <Footer />
        </main>

    )
}
export default Saved;
