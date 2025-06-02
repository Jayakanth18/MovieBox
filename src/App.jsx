import React, { useState, useEffect } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://www.apirequest.in/movie/api/");
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow">
            🎬 Movie Box
          </h1>
        </header>

        <div className="max-w-lg mx-auto mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-purple-500 border-solid" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((movie, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={movie.Images[0]}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-xl mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {movie.title}{" "}
                  <span className="text-sm text-gray-500">({movie.year})</span>
                </h2>
                <p className="text-sm text-purple-600 mb-2">{movie.genre}</p>
                <p className="text-sm text-gray-700 mb-4 flex-grow">
                  {movie.plot}
                </p>

                <div className="flex gap-2 overflow-x-auto py-2">
                  {movie.Images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`scene-${index}`}
                      className="w-24 h-16 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
