// دیتابیس محصولات (گلس ها و کاورها) برای حذف تکرار کدهای HTML
const productsData = [
    { id: 1, title: 'گلس پرایوسی آنتی استاتیک آیفون ۱۳ و ۱۴', type: 'glass-privacy', brand: 'apple', price: 180000, img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400' },
    { id: 2, title: 'گلس سرامیکی نشکن سامسونگ S23 Ultra', type: 'glass-ceramic', brand: 'samsung', price: 145000, img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400' },
    { id: 3, title: 'کاور سیلیکونی اورجینال شیائومی Poco F5', type: 'case', brand: 'xiaomi', price: 210000, img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400' },
    { id: 4, title: 'گلس شفاف سوپر دی آیفون ۱۵ پرو مکس', type: 'glass-clear', brand: 'apple', price: 160000, img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400' },
    { id: 5, title: 'قاب مگ سیف شفاف کریستالی آیفون ۱۴ پلاس', type: 'case', brand: 'apple', price: 320000, img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400' },
    { id: 6, title: 'گلس پرایوسی درجه یک سامسونگ A54', type: 'glass-privacy', brand: 'samsung', price: 175000, img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400' }
];

let cart = [];
let currentCategory = 'all';
let currentBrand = 'all';

// رندر کردن محصولات در صفحه بر اساس فیلتر فعال
function renderProducts() {
    const wrapper = document.getElementById('products-wrapper');
    wrapper.innerHTML = '';

    const filtered = productsData.filter(p => {
        const matchCat = currentCategory === 'all' || p.type === currentCategory;
        const matchBrand = currentBrand === 'all' || p.brand === currentBrand;
        return matchCat && matchBrand;
    });

    if(filtered.length === 0) {
        wrapper.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-secondary);">محصولی با فیلترهای انتخابی یافت نشد.</p>`;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.img}" alt="${product.title}">
            </div>
            <div class="product-info">
                <div class="product-tags">
                    <span class="tag">${translateTag(product.type)}</span>
                    <span class="tag">${translateTag(product.brand)}</span>
                </div>
                <h4>${product.title}</h4>
                <div class="product-price-row">
                    <span class="price">${product.price.toLocaleString('fa-IR')} تومان</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> خرید
                    </button>
                </div>
            </div>
        `;
        wrapper.appendChild(card);
    });
}

function translateTag(tag) {
    const dict = {
        'glass-privacy': 'پرایوسی', 'glass-ceramic': 'سرامیکی', 'glass-clear': 'شفاف',
        'case': 'کاور گوشی', 'apple': 'آیفون', 'samsung': 'سامسونگ', 'xiaomi': 'شیائومی'
    };
    return dict[tag] || tag;
}

// اضافه کردن به سبد خرید
window.addToCart = function(id) {
    const p = productsData.find(item => item.id === id);
    cart.push(p);
    updateCartUI();
};

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const container = document.getElementById('cart-items-container');
    
    if(cart.length === 0) {
        container.innerHTML = `<div class="empty-cart">سبد خرید شما در حال حاضر خالی است.</div>`;
        document.getElementById('cart-total-price').innerText = '۰ تومان';
        return;
    }

    container.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.style.cssText = "display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;";
        div.innerHTML = `
            <div>
                <p style="font-size:0.9rem; font-weight:bold;">${item.title}</p>
                <p style="color:var(--accent-color); font-size:0.85rem;">${item.price.toLocaleString('fa-IR')} تومان</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff3838; cursor:pointer;"><i class="fas fa-trash"></i></button>
        `;
        container.appendChild(div);
    });

    document.getElementById('cart-total-price').innerText = total.toLocaleString('fa-IR') + ' تومان';
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

// سیستم تغییر تم لایت و دارک هوشمند
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// ایونتهای کنترل پنل سبد خرید کشویی
document.getElementById('cart-trigger').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
});

const closeCart = () => {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
};
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

// راه‌اندازی ایونت فیلترها
document.getElementById('category-filters').addEventListener('click', (e) => {
    if(e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.getAttribute('data-filter');
        renderProducts();
    }
});

document.getElementById('brand-filters').addEventListener('click', (e) => {
    if(e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('#brand-filters .filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentBrand = e.target.getAttribute('data-filter');
        renderProducts();
    }
});

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
