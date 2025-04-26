const { useState, useEffect } = React;

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const ref = firebase.database().ref("feedbacks");
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      const arr = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setFeedbacks(arr.reverse());
    });
    return () => ref.off();
  }, []);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      firebase.database().ref("feedbacks/" + id).remove();
    }
  }

  return (
    <div className="feedback-list">
      {feedbacks.length === 0 ? (
        <div className="no-feedback">No feedback yet.</div>
      ) : (
        feedbacks.map((fb) => (
          <window.FeedbackItem key={fb.id} feedback={fb} onDelete={() => handleDelete(fb.id)} />
        ))
      )}
    </div>
  );
}

window.FeedbackList = FeedbackList;
