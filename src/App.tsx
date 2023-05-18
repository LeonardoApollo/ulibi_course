import { Suspense } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import './styles/index.scss'
import { AboutAsync } from './pages/AboutPage/About.async'
import { MainAsync } from './pages/MainPage/Main.async'
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Change Theme</button>
      <Link to={"/"}>Главная Страница</Link>
      <Link to={"/about"}>О Сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path={'/about'} element={<AboutAsync/>}/>
            <Route path={'/'} element={<MainAsync/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App