import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Frame } from './screens/Frame/Frame';
import { TermsOfUse } from './screens/TermsOfUse/TermsOfUse';
import { PrivacyPolicy } from './screens/PrivacyPolicy/PrivacyPolicy';
import { ExampleReport } from './screens/ExampleReport/ExampleReport';
import { BlogDetail } from './screens/BlogDetail/BlogDetail';
import { Loading } from './screens/Loading/Loading';
import { Error } from './screens/Error/Error';
import { Success } from './screens/Success/Success';
import { Checkout } from './screens/Checkout/Checkout';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-[#1C1C3A]">
                <Routes>
                    <Route path="/" element={<Frame />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/example-report" element={<ExampleReport />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 