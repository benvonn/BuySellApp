
import './App.css';
import UserMenu from './client/user/user';
import MainContent from './client/content/MainContent';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <UserMenu />
      </div>
      <div className='content'>
        <MainContent />
      </div>
    </div>
  );
}

export default App;
