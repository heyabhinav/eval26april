function FeedbackItem({ feedback, onDelete }) {
  let formattedTime = null;
  if (feedback.timestamp) {
    try {
      formattedTime = new Date(feedback.timestamp).toLocaleString();
    } catch (e) {}
  }
  return (
    <div className="feedback-item">
      <div className="feedback-header">
        <span className="feedback-name">{feedback.name}</span>
        <span className="feedback-email">({feedback.email})</span>
      </div>
      <div className="feedback-comment">{feedback.comment}</div>
      {formattedTime && <div className="feedback-timestamp">{formattedTime}</div>}
      <button className="delete-btn" onClick={onDelete} title="Delete feedback">Delete</button>
    </div>
  );
}

window.FeedbackItem = FeedbackItem;
