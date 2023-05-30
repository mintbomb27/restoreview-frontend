import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tables from "./pages/Tables";
import TableDetail from './pages/TableDetail';
import './index.css';
import Layout from "./pages/Layout";
import Emotions from "./pages/Emotions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Tables />} />
          <Route path="tableDetail" element={<TableDetail />} />
          <Route path="emotions" element={<Emotions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);