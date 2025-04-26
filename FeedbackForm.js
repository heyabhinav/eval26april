const { useState } = React;

function FeedbackForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.comment) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Enter a valid email.");
      return;
    }
    firebase.database().ref("feedbacks").push({ ...form, timestamp: Date.now() })
      .then(() => {
        setForm({ name: "", email: "", comment: "" });
        setSuccess("Feedback submitted!");
        onSubmitted && onSubmitted();
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => setError("Submission failed. Try again."));
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit} autoComplete="off">
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <textarea name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} required />
      <button type="submit">Submit</button>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
    </form>
  );
}

window.FeedbackForm = FeedbackForm;
