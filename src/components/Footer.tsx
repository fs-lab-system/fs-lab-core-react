export function Footer() {
  return (
    <footer>
      <p>
        © 2026 FS-Lab • v1.1.0 •{" "}
        <a href="https://github.com/fs-lab-system/fs-lab-overview"> GitHub</a>{" "}
        <button
          id="toTopBtn"
          className="toTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Top
        </button>
      </p>
    </footer>
  );
}
