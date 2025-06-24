export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Register
        </h2>
        <form>
          <div className="mb-4 text-black">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4 text-black">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6 text-black">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black  py-2 rounded hover:bg-white transition duration-200 text-white hover:text-black hover:border-black border-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
