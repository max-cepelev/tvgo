import { ChannelList } from '@modules/channels';
import { Player } from '@modules/player';
import { Button } from '@shared/ui';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { GetChannels } from '@wails/main/App';
import { main } from '@wails/models';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/playlists/$playlistId')({
  component: Playlist,
});

function Playlist() {
  const [channels, setChannels] = useState<main.Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<main.Channel | null>(
    null
  );
  // In a component!
  const { playlistId } = Route.useParams();

  const fetchChannels = async (playlistId: number) => {
    const channels = await GetChannels(playlistId);
    console.log({ channels, playlistId });
    if (channels) {
      setChannels(channels);
    }
  };

  useEffect(() => {
    fetchChannels(Number(playlistId));
  }, [playlistId]);

  return (
    <div className='h-full w-full flex'>
      <div>
        <Button asChild>
          <Link to='/'>Назад</Link>
        </Button>
        <Button onClick={() => fetchChannels(Number(playlistId))}>
          Обновить
        </Button>
        <ChannelList data={channels} onSelect={setCurrentChannel} />
      </div>
      <Player channel={currentChannel} />
    </div>
  );
}
