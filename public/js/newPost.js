async function newFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  try {
    const response = await fetch('/dashboard', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(`Post created`);
      location.reload();
    } else {
      console.log(`Failed to create post`);
    }
  } catch (error) {
    console.error(error);
    alert('Failed to create post. Please try again later.');
  }
}

document
  .querySelector('#newPostForm')
  .addEventListener('submit', newFormHandler);
