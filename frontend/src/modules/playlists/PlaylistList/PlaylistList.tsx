import { Button } from '@shared/ui';
import { Link } from '@tanstack/react-router';
import { main } from '@wails/models';
import { Cloud, Folder, Star, Trash2 } from 'lucide-react';

type PlaylistListProps = {
  playlists: main.Playlist[];
  onDelete: (id: number) => void;
};

export function PlaylistList({ playlists, onDelete }: PlaylistListProps) {
  return (
    <ul className='w-full max-w-sm space-y-2'>
      <li className='w-full'>
        <Button
          asChild
          className='w-full gap-2 justify-start'
          variant='outline'
        >
          <Link to={`/playlists/favorites`}>
            <Star />
            Избранное
          </Link>
        </Button>
      </li>
      {playlists?.map((playlist) => (
        <li className='w-full flex gap-2' key={playlist.id}>
          <Button
            asChild
            className='w-full gap-2 justify-start'
            variant='outline'
          >
            <Link to={`/playlists/${playlist.id}`}>
              {playlist.url === 'local' ? <Folder /> : <Cloud />}
              {playlist.name}
            </Link>
          </Button>
          <Button onClick={() => onDelete(playlist.id)} variant='outline'>
            <Trash2 />
          </Button>
        </li>
      ))}
    </ul>
  );
}
