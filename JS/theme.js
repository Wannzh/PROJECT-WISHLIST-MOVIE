// Untuk Merubah atau mengatur tema
function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    const icon = document.getElementById('theme');
    if (theme === 'light-theme') {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
    } else {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
    }
}

// Untuk Mengganti tema
function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light-theme' ? '' : 'light-theme';
    setTheme(newTheme);
}

// Untuk menyimpan perubahan tema di localstorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || '';
    setTheme(savedTheme);

    const icon = document.getElementById('theme');
    icon.onclick = toggleTheme;
});