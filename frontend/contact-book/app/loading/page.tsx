export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
