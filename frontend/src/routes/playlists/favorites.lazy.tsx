import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/playlists/favorites')({
  component: Favorites,
});

function Favorites() {
  return <div>Favorites</div>;
}
