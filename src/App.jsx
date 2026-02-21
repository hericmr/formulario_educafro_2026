import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from '@/context/FormContext';
import { FormView } from '@/views/FormView';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

function App() {
    return (
        <Router>
            <FormProvider>
                <Routes>
                    <Route path="/" element={<FormView />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </FormProvider>
        </Router>
    );
}

export default App;
