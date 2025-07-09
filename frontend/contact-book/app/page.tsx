import HomePage from "./Home";
import RootLayout from "./layout";

export default function Home() {
  return (
    <RootLayout>
      <div className="w-full h-full">
        <HomePage />
      </div>
    </RootLayout>
  );
}
