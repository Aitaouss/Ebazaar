export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to Store
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          This is the landing page of the Store application. Please login or
          register to continue.
        </p>
        <div className="flex justify-between">
          <a
            href="/login"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 text-center"
          >
            Login
          </a>
          <a
            href="/register"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 text-center ml-2"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
