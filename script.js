// Initialize the contact list
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Function to display contacts in the table
function displayContacts() {
    const contactList = document.querySelector("#contact-list tbody");
    contactList.innerHTML = ''; // Clear the list

    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}

// Function to save contact (new or edited)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const contactId = document.getElementById('contact-id').value;

    if (contactId === '') {
        // Add new contact
        contacts.push({ name, phone, email });
    } else {
        // Edit existing contact
        contacts[contactId] = { name, phone, email };
        document.getElementById('contact-id').value = '';
        document.getElementById('save-btn').textContent = 'Save Contact';
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
    document.getElementById('contact-form').reset(); // Clear the form
});

// Function to edit a contact
function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('contact-id').value = index;
    document.getElementById('save-btn').textContent = 'Update Contact';
}

// Function to delete a contact
function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}
// Allow only numbers in the phone number input
document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, ''); // Replace non-numeric characters
});

// Load and display contacts on page load
window.onload = displayContacts;
