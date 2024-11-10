import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/ui';

type DeletePlaylistDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeletePlaylistDialog({
  isOpen,
  onClose,
  onConfirm,
}: DeletePlaylistDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Удалить плейлист</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Вы уверены, что хотите удалить этот плейлист?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Отмена
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} type='button'>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
