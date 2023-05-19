import { Link } from 'react-router-dom'
import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { classNames } from 'shared/libs/classNames/classNames';
import { AppRouter } from './providers/routers/intex';

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Change Theme</button>
      <Link to={"/"}>Главная Страница</Link>
      <Link to={"/about"}>О Сайте</Link>
      <AppRouter/>
    </div>
  )
}

export default App