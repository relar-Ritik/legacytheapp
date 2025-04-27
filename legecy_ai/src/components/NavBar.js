import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="font-bold text-2xl">CounselAI</Link>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/advice" className="hover:underline">Advice</Link>
        <Link to="/summarization" className="hover:underline">Summarization</Link>
      </div>
    </nav>
  );
}
