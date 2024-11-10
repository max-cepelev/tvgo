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
import { AddPlaylistFromFile } from '@wails/main/App';

import { useState } from 'react';

type AddPlaylistFromFileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddPlaylistFromFileDialog({
  isOpen,
  onClose,
}: AddPlaylistFromFileDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = useEvent(async () => {
    if (!file) return;

    setLoading(true);

    try {
      // Читаем файл как ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      // Преобразуем ArrayBuffer в Uint8Array и затем в number[]
      const fileContent = Array.from(new Uint8Array(arrayBuffer));

      // Вызываем функцию Go с содержимым файла и его именем
      await AddPlaylistFromFile(fileContent, file.name);

      // Закрываем диалог после успешного выполнения
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении плейлиста:', error);
    } finally {
      setLoading(false);
      setFile(null);
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Добавить плейлист из файла</DialogTitle>
        </DialogHeader>
        <Input onChange={handleFileChange} id='picture' type='file' />
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
