// === ACCESS TOKEN (KEEP PRIVATE!) ===
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';

// === Dark Mode Toggle ===
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});

// === Reusable Graph API Fetch ===
async function fetchFBData(endpoint, fields = '') {
    let url = `https://graph.facebook.com/v24.0${endpoint}?access_token=${ACCESS_TOKEN}`;
    if (fields) url += `&fields=${fields}`;

    const response = await fetch(url);
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `HTTP ${response.status}`);
    }
    return await response.json();
}

// === Display Profile or Page ===
function displayProfile(data) {
    const container = document.getElementById('profileCard');
    const imgUrl = data.picture?.data?.url || 'https://via.placeholder.com/150?text=No+Image';

    container.innerHTML = `
        <img src="${imgUrl}" alt="Profile or Page Picture">
        <div>
            <h2>${data.name || 'Unknown Name'}</h2>
            <p><strong>ID:</strong> ${data.id}</p>
            ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
            ${data.category ? `<p><strong>Category:</strong> ${data.category}</p>` : ''}
        </div>
    `;
}

// === UI Helpers ===
function showError(message) {
    const errorEl = document.getElementById('errorMsg');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function toggleLoading(show) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

// === Fetch My Profile ===
document.getElementById('fetchProfileBtn').addEventListener('click', async () => {
    document.getElementById('dataSection').classList.remove('hidden');
    document.getElementById('errorMsg').classList.add('hidden');
    toggleLoading(true);

    try {
        const profile = await fetchFBData('/me', 'name,email,picture.width(500).height(500),id');
        displayProfile(profile);
    } catch (err) {
        showError('Failed to load your profile: ' + err.message);
    } finally {
        toggleLoading(false);
    }
});

// === Fetch Selected Page ===
document.getElementById('fetchPageBtn').addEventListener('click', async () => {
    const pageId = document.getElementById('pageSelect').value;
    if (!pageId) {
        alert('Please select a page first.');
        return;
    }

    const pageLabel = document.getElementById('pageSelect').selectedOptions[0].text;

    document.getElementById('dataSection').classList.remove('hidden');
    document.getElementById('errorMsg').classList.add('hidden');
    toggleLoading(true);

    try {
        const pageInfo = await fetchFBData(`/${pageId}`, 'name,picture.width(500).height(500),category,id');
        displayProfile(pageInfo);
    } catch (err) {
        showError(`Error loading page (${pageLabel}): ${err.message}`);
    } finally {
        toggleLoading(false);
    }

});
