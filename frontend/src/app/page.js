"use client";

import IconButton from "@/component/IconButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [results, setResults] = useState([]);

  // const movies = [
  //   { title: "Fight Club", slug: "fight-club" },
  //   { title: "The Social Network", slug: "the-social-network" },
  //   { title: "Inception", slug: "inception" },
  // ];

  const fetchMovies = async (searchTerm) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/movies/search/?q=${searchTerm}`,
      );

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        fetchMovies(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (slug) => {
    router.push(`/articles/${slug}`);
  };

  return (
    <main className="min-h-screen">
      <section
        className="relative min-h-[70vh] md:min-h-[90vh] w-full bg-cover bg-left md:bg-center"
        style={{
          backgroundImage: "url('/images/orange camera cinema2.png')",
        }}
      >
        {/* Content  items-center */}
        <div className="relative z-10 flex min-h-[90vh] ">
          <div className="ml-auto max-w-xl px-6 md:px-16 text-right mt-40 mr-30">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              سینما فقط دیدن نیست
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-800/80">
              فیلم‌هایی که حال و هوای امروزت رو می‌فهمن
            </p>
            <button className="mt-10  inline-flex items-center gap-2 rounded-full bg-amber-800/90 px-6 py-3 text-20px font-medium text-black hover:bg-white transition">
              حال و هواتو بگو، فیلمتو بگیر
            </button>

            <div className="absolute right-6 bottom-24 hidden md:flex flex-col gap-6 text-white/60">
              <IconButton src="/icons/lights.png" alt="نور" />
              <IconButton src="/icons/camera.png" alt="دوربین" />
              <IconButton src="/icons/clapper.png" alt="حرکت" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="min-h-screen flex justify-center px-4"
        style={{
          backgroundImage: "url('/images/bg-search.png')",
        }}
      >
        <div className="w-full max-w-2xl text-center mt-24 md:mt-32">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
            فیلم مورد نظرت رو پیدا کن
          </h2>

          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="اسم فیلم رو بنویس..."
              className="w-full py-4 px-6 rounded-full text-white placeholder-white/60 bg-white/10 backdrop-blur-md border
               border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/60 transition"
            />

            <button
              // onClick={handleSearch}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-neutral-800 text-white px-3 py-3 rounded-full"
            >
              <Search />
            </button>

            {/* age chizi ke search kard peyda shod -> dropdown */}
            {results.length > 0 && (
              <div
                className="
                    absolute
                    mt-3
                    w-full
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-md
                    border border-white/20
                    overflow-hidden"
              >
                {results.map((result) => (
                  <div
                    key={result.title}
                    onClick={() => handleSelect(result.title)}
                    className="px-6 py-3 text-white hover:bg-white/10 cursor-pointer transition"
                  >
                    {result.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
