document.getElementById('document-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/documents', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            alert('Document submitted successfully');
            loadDocuments();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function loadDocuments() {
    fetch('/documents')
    .then(response => response.json())
    .then(data => {
        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';
        data.forEach(doc => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${doc.subject}</h3>
                <p>Serial Number: ${doc.serialNumber}</p>
                <p>Reference ID: ${doc.referenceID}</p>
                <p>Date: ${new Date(doc.dateOfDocument).toLocaleDateString()}</p>
                <p>Time: ${doc.timeOfDocument}</p>
                <p>From: ${doc.fromEntity}</p>
                <a href="${doc.pdfPath}" target="_blank">View PDF</a>
                <h4>Actions:</h4>
                <ul>
                    ${doc.actions.map(action => `<li>${action.actionName} (Deadline: ${new Date(action.deadline).toLocaleDateString()}, Pending: ${new Date(action.pendingDate).toLocaleDateString()})</li>`).join('')}
                </ul>
            `;
            documentList.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

loadDocuments();
