import logo from "../../images/logohead.svg";
import {useFormWithValidation } from "../../hooks/useValidationForm";

const Register = (props) => {

    const {values, handleChange, resetFrom, errors, isValid} = useFormWithValidation();

    function handleRegisterSubmit(e) {
        e.preventDefault();
        props.onRegister(values);
        resetFrom();
    }
    return(
            <section className='register'>
                <img className='register__icon' alt='Логотип' src={logo} />
                <h3 className='register__title'>Добро пожаловать!</h3>
                <form className='register__form' onSubmit={handleRegisterSubmit}>
                    <label className='register__label'>Имя</label>
                    <input type='text' id="form__input-name" className='register__input'
                           onChange={handleChange}
                           name="name"
                           minLength="2"
                           maxLength="20"

                           pattern="([а-яА-Яёa-zA-Z0-9.]|\s|-)*"
                           required
                    />
                    <span className='register__form_span'>{}</span>
                    <label htmlFor='email' className='register__label'>E-mail</label>
                    <input type='email' id='email' className='register__input'
                           onChange={handleChange}
                           name="email"
                           pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"

                           required
                    />
                    <span className='register__form_span'>{}</span>
                    <label htmlFor='password' className='register__label'>Пароль</label>
                    <input id='password' type='password' className='register__input'
                           name="password"
                           onChange={handleChange}
                           minLength="8"
                           maxLength="20"

                           required
                    />
                    <span className='register__form_span'>{}</span>
                    <button type='submit' className='register__button'>Зарегистрироваться</button>
                </form>
                <p className='register__enter-text'>Уже зарегистрированы? <a className='register__enter-link' href='/sign-in'>Войти</a></p>
            </section>
    )
}
export default Register;
