export default function ContactPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Store</h2>
        <p className="text-gray-700 mb-4 text-center">
          This is the stores page of the Store application. You can add or view
          Stores here.
        </p>
        <div className="flex justify-between">
          <a
            href="/add-contact"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 text-center"
          >
            Store
          </a>
          <a
            href="/view-contacts"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 text-center ml-2"
          >
            Store
          </a>
        </div>
      </div>
    </div>
  );
}
