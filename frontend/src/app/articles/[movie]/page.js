export default async function MoviePage({ params }) {
  const { movie } = await params;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl text-blue-500 font-bold mb-4">{movie}</h1>
      <p>Critics and description will go here.</p>
    </div>
  );
}
