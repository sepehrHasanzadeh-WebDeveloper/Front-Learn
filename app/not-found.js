import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] p-6">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.172 9.172a4 4 0 015.656 5.656M15 15l4 4"
                stroke="#1e3a8a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="11" cy="11" r="7" stroke="#4c1d95" strokeWidth="2" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">404</h1>

          <p className="text-gray-400 mb-6">
            صفحه‌ای که دنبال آن هستید پیدا نشد.
          </p>

          <Link
            href="/"
            className=" p-4 m-5 inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-700 to-blue-900 text-white text-sm hover:opacity-90 transition"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </>
  );
}
