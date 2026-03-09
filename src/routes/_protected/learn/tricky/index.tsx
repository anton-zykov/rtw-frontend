import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/learn/tricky/')({
  component: TrickyIndexComponent,
});

function TrickyIndexComponent () {
  return <div>Здесь пока ничего нет :(</div>;
}
