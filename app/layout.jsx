import './globals.css';
import Sidebar from './Sidebar';

export const metadata = {
  title: {
    default: 'AI Builder Rules',
    template: '%s · AI Builder Rules',
  },
  description:
    'A library of rules for building AI-driven UI — Transform, Flow, Intent, Visual Elements, plus the Golden Rules.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
