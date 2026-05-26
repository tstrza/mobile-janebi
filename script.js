// تغییر استایل هدر هنگام اسکرول کردن به پایین
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(13, 14, 21, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(13, 14, 21, 0.85)';
    }
});

