import { Button } from '@shared/ui';
import { main } from '@wails/models';

type ChannelListProps = {
  data: main.Channel[];
  onSelect: (channel: main.Channel) => void;
};
export function ChannelList({ data, onSelect }: ChannelListProps) {
  return (
    <ul className='h-full w-[300px] overflow-auto pr-2'>
      {data.map((channel) => (
        <li className='w-full mb-1' key={channel.id}>
          <Button
            variant='outline'
            className='w-full justify-start'
            onClick={() => onSelect(channel)}
          >
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
