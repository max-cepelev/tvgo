import { main } from '@wails/models';
import ReactPlayer from 'react-player';

type PlayerProps = {
  channel: main.Channel | null;
};

export function Player({ channel }: PlayerProps) {
  console.log({ channel });
  return (
    <ReactPlayer
      width={'100%'}
      height={'100%'}
      controls={true}
      url={channel?.url}
    />
  );
}
