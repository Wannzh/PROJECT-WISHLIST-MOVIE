// Membuat tombol untuk list atau humberger navbar
const menuIcon = document.getElementById("menu-icon");
const menuNav = document.getElementById("menu-list");

// Menambahkan event kedalam isi list
menuIcon.addEventListener('click', () => {
    menuNav.classList.toggle('hidden');
});