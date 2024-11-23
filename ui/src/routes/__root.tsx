import NotFoundPage from '@/pages/NotFoundPage'
import { createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {AuthContext} from "../../hooks/useAuth.tsx";


type RouterContext = {
    authentication: AuthContext;
}

const isDevMode = import.meta.env.MODE === 'development'

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <Outlet />
            {isDevMode && <TanStackRouterDevtools />}
        </>
    ),
    notFoundComponent: () => <NotFoundPage />,
})