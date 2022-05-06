import oculus from "../images/text__COLOR_landing-logo.svg";


function Promo() {

    return(

        <section className="promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <div className="promo__container">
                <img className="promo__image" src={oculus}/>
            </div>
        </section>

    )
}
export default Promo;
