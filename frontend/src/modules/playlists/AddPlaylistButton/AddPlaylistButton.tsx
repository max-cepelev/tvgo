import { Button, Popover, PopoverContent, PopoverTrigger } from '@shared/ui';
import { Download, FileDown, Plus } from 'lucide-react';

type AddPlaylistButtonProps = {
  onClick: (type: 'link' | 'file') => void;
};

export function AddPlaylistButton({ onClick }: AddPlaylistButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className='flex flex-col gap-2'>
          <li>
            <Button
              onClick={() => onClick('file')}
              className='w-full gap-2'
              variant='outline'
            >
              <FileDown />
              Загрузить с компьютера
            </Button>
          </li>
          <li>
            <Button
              onClick={() => onClick('link')}
              className='w-full gap-2'
              variant='outline'
            >
              <Download />
              Загрузить по ссылке
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
