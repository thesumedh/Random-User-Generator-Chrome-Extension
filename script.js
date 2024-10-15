document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtns = document.querySelectorAll('.copy-btn');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');

    if (!generateBtn || !nameElement || !emailElement || !phoneElement || !addressElement || copyBtns.length === 0) {
        console.error('Generate button, copy buttons, or one or more user fields are missing from the DOM.');
        return;
    }

    generateBtn.addEventListener('click', generateUser);
    copyBtns.forEach(btn => btn.addEventListener('click', copyToClipboard));

    generateUser(); // Automatically generate a user on page load

    function generateUser() {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                const user = data.results[0];
                nameElement.textContent = `${user.name.first} ${user.name.last}`;
                emailElement.textContent = user.email;
                phoneElement.textContent = user.phone;
                addressElement.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`;
            })
            .catch(error => console.error('Error fetching user data:', error));
    }

    function copyToClipboard(event) {
        const field = event.target.getAttribute('data-field');
        const text = document.getElementById(field).textContent;
        navigator.clipboard.writeText(text).then(() => {
            event.target.textContent = 'Copied!';
            setTimeout(() => {
                event.target.textContent = '📋';
            }, 1500);
        });
    }
});
