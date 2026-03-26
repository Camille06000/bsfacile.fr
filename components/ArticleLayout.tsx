import Nav from './Nav';
import Footer from './Footer';

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
