export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message); // Log error for debugging
    res.status(500).json({ message: err.message || 'An unexpected error occurred' });
  };
  