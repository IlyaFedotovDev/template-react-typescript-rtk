import { Routes, Route, Link } from '../node_modules/react-router-dom/index';
import '@/styles/global.scss';
import Home from './pages/Home';

export default function App(): JSX.Element {
    return (
        <div className="app">
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <div className="app__content">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </div>
    );
}
