const Notification = ({ successMessage, errorMessage }) => {
  if (!successMessage && !errorMessage) {
    return;
  }

  return (
    <>
      {successMessage ? (
        <div className="message message-success">{successMessage}</div>
      ) : (
        <div className="message message-error">{errorMessage}</div>
      )}
    </>
  );
};

export default Notification;
