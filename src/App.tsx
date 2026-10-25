/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MarketingLayout } from './components/landing/MarketingLayout';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { AuthenticityPage } from './pages/AuthenticityPage';
import { BusinessesPage } from './pages/BusinessesPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AppWorkspacePage } from './pages/AppWorkspacePage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Marketing Routes with Consistent Navbar & Footer */}
        <Route path="/" element={<MarketingLayout />}>
          <Route index element={<HomePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="authenticity" element={<AuthenticityPage />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Authenticated Application Workspace */}
        <Route path="/app/*" element={<AppWorkspacePage />} />
      </Routes>
    </AuthProvider>
  );
}
