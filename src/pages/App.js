import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ForgotPassWordPage from './ForgotPassWordPage';
import NewStockPage from './NewStockPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/ForgotPassWordPage" element={<ForgotPassWordPage />} /> */}
        <Route path="/:jwtToken/NewStockPage/" element={<NewStockPage />} />
      </Routes>
    </Router>
  );
};

export default App;
