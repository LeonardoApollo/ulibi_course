import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { classNames } from 'shared/libs/classNames/classNames';
import { AppRouter } from './providers/routers/intex';
import { Navbar } from 'widgets/Navbar';

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar/>
      <AppRouter/>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  )
}

export default App