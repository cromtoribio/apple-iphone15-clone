import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://557de67f932a207dd02ea6e3d76e6408@o4509166164967424.ingest.us.sentry.io/4509166166736896",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect: React.useEffect
        }),
        Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false
        })
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
