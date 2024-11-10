import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen bg-current mx-auto p-8'>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
