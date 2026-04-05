function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/70">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Welcome to SaaS App</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          This is your main dashboard placeholder. The login page now lives under <span className="font-semibold">src/page/authentication</span>.
        </p>
      </div>
    </div>
  )
}

export default Home