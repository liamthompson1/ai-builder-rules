import Page from './page';

// While the real app doesn't exist yet, render the "Ready to build?"
// placeholder for any unknown path instead of Next's default 404.
export default function NotFound() {
  return <Page />;
}
