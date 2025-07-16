import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col items-center justify-center px-6 text-white">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-6xl font-extrabold drop-shadow-md">
          DevTinder 💘
        </h1>
        <p className="text-xl mt-2 italic">
          Where semicolons meet soulmates.
        </p>
      </header>

      {/* Hero Image */}
      <div className="mb-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6187/6187136.png"
          alt="Dev Love"
          className="w-48 h-48 animate-bounce"
        />
      </div>

      {/* Tagline */}
      <div className="text-center max-w-lg mb-10">
        <p className="text-lg">
          Tired of unmatched brackets? Swipe right on someone who understands your
          syntax. No runtime errors in romance.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Join Now 🚀
        </button>
        <button
          onClick={() => navigate('/login')}
          className="border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-purple-700 transition"
        >
          Already Cuffed? Login
        </button>
      </div>

      {/* Footer Joke */}
      <footer className="absolute bottom-6 text-center text-sm opacity-80">
        <p>
          Built with ❤️ and <code>npm install romance</code> (not found).
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;