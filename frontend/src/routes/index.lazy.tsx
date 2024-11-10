import {
  AddPlaylistButton,
  AddPlaylistFromFileDialog,
  AddPlaylistFromLinkDialog,
  DeletePlaylistDialog,
  PlaylistList,
} from '@modules/playlists';

import { createLazyFileRoute } from '@tanstack/react-router';
import { DeletePlaylist, GetPlaylists } from '@wails/main/App';
import { main } from '@wails/models';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const [playlists, setPlaylists] = useState<main.Playlist[] | null>(null);
  const [dialogType, setDialogType] = useState<'link' | 'file' | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchPlaylists = async () => {
    const playlists = await GetPlaylists();
    console.log({ playlists });
    setPlaylists(playlists);
  };

  const handleDialogClose = () => {
    fetchPlaylists();
    setDialogType(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await DeletePlaylist(deleteId);
    fetchPlaylists();
    setDeleteId(null);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <h3 className='text-accent'>TVGO</h3>
      <p className='text-muted'>
        Выберите плейлист из списка, добавьте новый с компьютера или загрузите
        по ссылке по ссылке
      </p>
      <AddPlaylistButton onClick={setDialogType} />
      <PlaylistList playlists={playlists || []} onDelete={setDeleteId} />
      <AddPlaylistFromLinkDialog
        isOpen={dialogType === 'link'}
        onClose={handleDialogClose}
      />
      <AddPlaylistFromFileDialog
        isOpen={dialogType === 'file'}
        onClose={handleDialogClose}
      />
      <DeletePlaylistDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
