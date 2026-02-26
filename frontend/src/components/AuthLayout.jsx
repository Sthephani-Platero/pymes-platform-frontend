export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {title}
        </h2>

        {children}

      </div>
    </div>
  );
}