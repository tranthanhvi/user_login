
const infoList = document.querySelector('.info');
const loggegOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
        // account info
        const html = `
            <div>Logged in as <strong>${user.email}</strong></div>
        `;

        accountDetails.innerHTML = html;
        //toggle  UI elements 
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggegOutLinks.forEach(link => link.style.display = 'none');
    } else {
        //hide account info
        accountDetails.innerHTML = '';
        //toggle  UI elements 
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggegOutLinks.forEach(link => link.style.display = 'block');


    }
}

function toggleCollapsibleBody(e) {
    const collapsibleBody = e.target.parentElement.querySelector('.collapsible-body');
    collapsibleBody.classList.toggle('active');
}

//setup instructions (info)
const setupInfo = (data) => {

    if (data && data.docs && data.docs.length) {
        document.getElementById('overlay').style.display = 'none';
        let html = '';
        data.forEach(doc => {
            const info = doc.data();
            console.log(info);

            const li = `
                <li>
                    <div class="collapsible-header">${info.title}</div>
                    <div class="collapsible-body">${info.content}</div>

                </li>
            `;
            html += li
    })
    infoList.innerHTML = html;
}  else {
    console.log('no data');
    infoList.innerHTML = '<h5 style="text-align: center">Login to view "onlyfans" content! 😉 👆</h5>'
}
}

infoList.addEventListener('click', function(e) {
    if (e.target.matches('.collapsible-header')) {
        toggleCollapsibleBody(e)
    }
})

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    closeModal();
}

function openModal(modalId) {
    closeModal();
    document.getElementById('overlay').style.display = 'block';
    var modal = document.getElementById(modalId);
    modal.style.display = "flex";
}

function closeModal(modalId) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.style.display = 'none';
        
    })
}

function logout() {
    console.log('Logout clicked');
    alert('You are logged out now');
}

