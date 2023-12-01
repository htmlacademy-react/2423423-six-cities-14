import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../types/store';
import { FormEvent, useRef, useState } from 'react';
import { AppRoute } from '../consts/route';
import Logo from '../components/logo';
import { AuthorizationStatus, LOCATIONS_NAME } from '../consts/consts';

export default function Login() {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const [loginData, setLoginData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          login: loginData,
          password: passwordData,
        })
      );
      if (authorizationStatus === AuthorizationStatus.Auth) {
        return navigate(AppRoute.Root);
      } else {
        setLoginData('');
        setPasswordData('');
      }
    }
  };
  const getRandomCity = (cities: string[]) =>
    cities[Math.floor(Math.random() * 6)];
  const randomCity = getRandomCity(LOCATIONS_NAME);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData}
                  onChange={(e) => setLoginData(e.target.value)}
                  pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={passwordData}
                  onChange={(e) => setPasswordData(e.target.value)}
                  pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/${randomCity}`}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
