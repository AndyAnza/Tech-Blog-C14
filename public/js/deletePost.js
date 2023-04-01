const deletePostBtns = document.querySelectorAll('.deletePostBtn');

deletePostBtns.forEach(deletePostBtn => {
  deletePostBtn.addEventListener('click', async event => {
    const postId = event.target.getAttribute('data-post-id');
    const userId = event.target.getAttribute('data-user-id');

    console.log(postId);
    console.log(userId);

    // Make a DELETE request to delete the dish with the given ID and user ID
    const response = await fetch(`/${userId}/${postId}`, {
      method: 'DELETE',
    });

    // Handle the response
    if (response.ok) {
      // Reload the page to reflect the changes
      window.location.reload();
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  });
});
