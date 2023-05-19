import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { classNames } from 'shared/libs/classNames/classNames';
import { AppRouter } from './providers/routers/intex';
import { Navbar } from 'widgets/Navbar';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar/>
      <AppRouter/>
    </div>
  )
}

export default App