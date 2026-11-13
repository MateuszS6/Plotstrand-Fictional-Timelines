import "@fontsource-variable/manrope"
import "@fontsource-variable/space-grotesk"
import { Analytics } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes.tsx'
import './index.css'
import './styles/auth.css'
import './styles/buttons.css'
import './styles/character-panel.css'
import './styles/layout.css'
import './styles/management.css'
import './styles/timeline-guide.css'
import './styles/timeline.css'
import './styles/workspace.css'

const analyticsOptOutKey = 'plotstrand.analyticsOptOut'

function isAnalyticsOptedOut() {
	try {
		return window.localStorage.getItem(analyticsOptOutKey) === 'true'
	} catch {
		return false
	}
}

const router = createBrowserRouter([
	{ path: "*", element: <AppRoutes /> }
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Analytics beforeSend={(event) => isAnalyticsOptedOut() ? null : event} />
	</StrictMode>,
)
