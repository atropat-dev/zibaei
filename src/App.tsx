import './App.css';
import Login from './components/Login';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        width: '100%',
        margin: 0,
        padding: 0,
        
      }}
    >
      <div style={{ margin: '0 auto' }}>
        <Login />
      </div>
    </div>
  );
}

export default App;
