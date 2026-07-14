export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold mb-4">ThreadPlay</h1>
        <p className="text-2xl mb-8">Fleet Battle Dinghy & Autonomous Simulations</p>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Games</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Fleet Battle (2p)</h3>
              <p>4×4 grid tactical combat</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Fleet Battle (3p)</h3>
              <p>5×5 grid free-for-all</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Lil Dinghy Battle</h3>
              <p>4-8 players, 5×5 grid</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Large Fleet</h3>
              <p>9-12 players, 6×6 grid</p>
            </div>
          </div>
        </section>
        
        <section>
          <p className="text-lg">Trigger: <code className="bg-white/20 px-2 py-1 rounded">@battle_dinghy</code></p>
        </section>
      </div>
    </main>
  )
}