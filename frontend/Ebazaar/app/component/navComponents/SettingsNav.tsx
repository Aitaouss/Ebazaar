export default function SettingNav() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full p-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-gray-200">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Settings Section
        </h1>
        <p className="text-gray-500 mb-6">
          Your Settings details will appear here soon. We’re working on giving
          you a personalized dashboard.
        </p>
        <button className="px-6 py-2 bg-[#A44A3F] text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300">
          Coming Soon 🚀
        </button>
      </div>
    </div>
  );
}
