document.getElementById('submitComment').addEventListener('click', async () => {
    const content = document.getElementById('commentContent').value.trim();
    const postId = document.getElementById('submitComment').getAttribute('data-post-id');
  
    if (!content) {
      alert('Please enter a comment.');
      return;
    }
  
    try {
      const response = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, postId })
      });
  
      if (response.ok) {
          location.reload(); // Reload the page to show the new comment
      } else {
          alert('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  });
  