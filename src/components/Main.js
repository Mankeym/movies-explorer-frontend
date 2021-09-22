import Promo from "./Promo";
import About from "./About";
import Technologies from "./Technologies";
import Student from "./Student";
import Footer from "./Footer";
import Header from "./Header";


function Main() {
    return(
        <main>
            <div className="page">
            <Header />
            <Promo />
            <About />
            <Technologies />
            <Student />
            <Footer />
            </div>
        </main>

    )
}
export default Main;
