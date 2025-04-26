const { createRoot } = ReactDOM;

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Feedback Board</h1>
        <window.ThemeToggle />
      </header>
      <main>
        <window.FeedbackForm />
        <window.FeedbackList />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
