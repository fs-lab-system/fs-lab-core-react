import { Footer } from "../components/Footer";
import { Navigation } from "../components/Natigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="container">{children}</main>
      <br />
      <br />
      <Footer />
    </>
  );
}
