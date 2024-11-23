import NotFoundPage from '@/pages/NotFoundPage'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const isDevMode = import.meta.env.MODE === 'development'

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            {isDevMode && <TanStackRouterDevtools />}
        </>
    ),
    notFoundComponent: () => <NotFoundPage />,
})