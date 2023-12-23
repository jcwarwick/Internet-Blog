document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            openEditForm(id);
        }

        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            deletePost(id);
        }
    });
});

function openEditForm(postId) {
    console.log('Attempting to fetch post with ID:', postId);
    fetch(`/api/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched post data:', data);
            document.getElementById('edit-id').value = data.id;
            document.getElementById('edit-title').value = data.title;
            document.getElementById('edit-content').value = data.content;
            document.getElementById('edit-modal').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching post details:', error);
            alert('Error fetching post details: ' + error.message);
        });
}

function deletePost(id) {
    fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log('Post deleted');
        document.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error while deleting post: ' + error.message);
    });
}

document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postId = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;

    fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(() => {
        console.log('Post updated');
        document.getElementById('edit-modal').classList.add('hidden'); // Hide the modal
        document.location.reload(); // Reload the page to update the post list
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(`Error while updating post: ${error.message}`);
    });
});