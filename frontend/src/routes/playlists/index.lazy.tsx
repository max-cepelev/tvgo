import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/playlists/')({
  component: Index,
})

export default function Index() {
  return <div>I</div>
}
