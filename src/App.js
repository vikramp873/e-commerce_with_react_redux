import { Routes, Route } from "react-router-dom"
import Header from './components/headers/Headers';
import Home from './pages/Home'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
