import { useEvent } from '@shared/hooks';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@shared/ui';
import { AddPlaylistFromURL } from '@wails/main/App';

import { ChangeEvent, useState } from 'react';

type AddPlaylistFromLinkDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddPlaylistFromLinkDialog({
  isOpen,
  onClose,
}: AddPlaylistFromLinkDialogProps) {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useEvent(async () => {
    setLoading(true);
    await AddPlaylistFromURL(url, url.split('/').pop() || 'playlist')
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
        setUrl('');
      });
  });

  const handleChange = useEvent(({ target }: ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Добавить плейлист по ссылке</DialogTitle>
        </DialogHeader>
        <Input
          value={url}
          onChange={handleChange}
          type='url'
          placeholder='Ссылка на плейлист'
        />
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Отмена
            </Button>
          </DialogClose>
          <Button isLoading={loading} onClick={handleClick} type='button'>
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
