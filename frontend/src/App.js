import Nav from './components/Nav';
import MainContent from './components/MainContent';
import './components/style/App.css';

export default function App () {
    return (
        <div className="main-container center">
        <Nav />
        <MainContent />
        </div>
    )
}