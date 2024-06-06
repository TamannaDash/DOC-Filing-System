function addDocument() {
    const category = document.getElementById('category').value;
    const filename = document.getElementById('filename').value;
    const content = document.getElementById('content').value;

    fetch('/add_document', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, filename, content }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.message;
    });
}

function viewDocuments() {
    const category = document.getElementById('category').value;

    fetch(`/view_documents?category=${category}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.documents.join('\n');
    });
}

function retrieveDocument() {
    const category = document.getElementById('category').value;
    const filename = document.getElementById('filename').value;

    fetch(`/retrieve_document?category=${category}&filename=${filename}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.content;
    });
}

function deleteDocument() {
    const category = document.getElementById('category').value;
    const filename = document.getElementById('filename').value;

    fetch('/delete_document', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, filename }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.message;
    });
}
