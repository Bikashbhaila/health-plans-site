import {BrowserRouter, Routes, Route} from 'react-router-dom';
import BrowsePage from "./pages/BrowsePage.tsx";
import ComparePage from "./pages/ComparePage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BrowsePage />} />
                <Route path="/compare" element={<ComparePage />} />
            </Routes>
        </BrowserRouter>
    );
}
