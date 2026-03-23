export default function NotFound() {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-[#f7f5fa]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#62358F] mb-4">404</h1>
          <p className="text-lg text-[#6b5f80]">Page not found</p>
          <a
            href="/lv"
            className="inline-block mt-6 px-6 py-3 bg-[#62358F] rounded-full font-semibold text-white hover:bg-[#9D51E9] transition-colors"
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
