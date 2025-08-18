import { getAccessToken, refreshAccessToken } from './authService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'flex';

    try {
        filterSidebar();
    } catch (err) {
        showNotification(`❌ Failed to load dashboard data: ${err.message}`, 'error');
        console.error(err);
    } finally {
        if (loader) loader.style.display = 'none';
    }
});

function showNotification(message, type = 'success') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle'
    };
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span style="margin-left: 10px;">${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

function filterSidebar() {
    const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');

    sidebarItems.forEach((li) => {
        const a = li.querySelector('a');
        if (a) {
            const href = a.getAttribute('href');
            if (href !== '#' && !permissions.includes(href)) {
                li.style.display = 'none';
            }
        }
    });
}