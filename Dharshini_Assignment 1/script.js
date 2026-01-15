
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
    
    if (navMobile.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

const mobileLinks = document.querySelectorAll('.nav-link-mobile');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==================== NAVIGATION ====================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});


const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe stat items
document.querySelectorAll('.stat-item').forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(stat);
});

const ctaButtons = document.querySelectorAll('.cta-btn, .hero-cta');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productSection = document.querySelector('.product-section');
        if (productSection) {
            productSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Search feature - Coming soon!');
    });
}


const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach(item => {
    const header = item.querySelector('.collection-header');
    const content = item.querySelector('.collection-content');
    const toggleBtn = item.querySelector('.toggle-btn');
    
    header.addEventListener('click', () => {
        collectionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherContent = otherItem.querySelector('.collection-content');
                const otherBtn = otherItem.querySelector('.toggle-btn');
                otherContent.classList.remove('open');
                otherBtn.textContent = '+';
                otherBtn.setAttribute('data-state', 'closed');
            }
        });
        
        item.classList.toggle('active');
        content.classList.toggle('open');
        
        if (content.classList.contains('open')) {
            toggleBtn.textContent = '−';
            toggleBtn.setAttribute('data-state', 'open');
        } else {
            toggleBtn.textContent = '+';
            toggleBtn.setAttribute('data-state', 'closed');
        }
    });
});

const statsBoxes = document.querySelectorAll('.stat-box');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

statsBoxes.forEach((box) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.6s ease';
    statsObserver.observe(box);
});

// Animate percentage numbers counting up
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentages = document.querySelectorAll('.stat-percentage');
                percentages.forEach(percentage => {
                    const target = parseInt(percentage.textContent);
                    animateCounter(percentage, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counterObserver.observe(statsSection);
}

// ==================== PRODUCT SECTION ====================

// Subscription toggle functionality
const subscriptionCards = document.querySelectorAll('.subscription-card');
subscriptionCards.forEach(card => {
    const radioInput = card.querySelector('input[type="radio"]');
    const header = card.querySelector('.subscription-header');
    const content = card.querySelector('.subscription-content');
    
    // Click on header to toggle
    header.addEventListener('click', () => {
        // Close all other subscription contents
        document.querySelectorAll('.subscription-content').forEach(c => {
            if (c !== content) {
                c.classList.remove('active');
            }
        });
        
        // Open clicked subscription
        radioInput.checked = true;
        content.classList.add('active');
    });
    
    radioInput.addEventListener('change', () => {
        if (radioInput.checked) {
            document.querySelectorAll('.subscription-content').forEach(c => {
                if (c !== content) {
                    c.classList.remove('active');
                }
            });
            content.classList.add('active');
        }
    });
});

document.querySelectorAll('.fragrance-option').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.parentElement;
        const siblings = parent.querySelectorAll('.fragrance-option');
        siblings.forEach(sib => sib.classList.remove('selected'));
        
        this.classList.add('selected');
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Gallery navigation functionality
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const dots = document.querySelectorAll('.dot');

if (mainImage && thumbnails.length > 0) {
    let currentImageIndex = 0;
    const images = Array.from(thumbnails).map(thumb => thumb.src);

    function updateGallery(index) {
        currentImageIndex = index;
        mainImage.src = images[index];
        
        // Add fade effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.style.opacity = '1';
        }, 100);
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Thumbnail click events
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateGallery(index));
    });

    // Dot click events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateGallery(index));
    });

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateGallery(currentImageIndex);
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGallery(currentImageIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateGallery(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGallery(currentImageIndex);
        }
    });
}

// Add to cart functionality
const addToCartBtn = document.querySelector('.add-to-cart-btn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const selectedSubscription = document.querySelector('input[name="subscription"]:checked');
        
        if (selectedSubscription) {
            const subscriptionType = selectedSubscription.id === 'singleSub' ? 'Single' : 'Double';
            const subscriptionCard = selectedSubscription.closest('.subscription-card');
            
            // Get selected fragrances
            const selectedFragrances = subscriptionCard.querySelectorAll('.fragrance-option.selected');
            const fragranceNames = Array.from(selectedFragrances).map(frag => {
                return frag.querySelector('.fragrance-name').textContent;
            });
            
            const priceElement = subscriptionCard.querySelector('.sub-price');
            const price = priceElement.textContent.split(' ')[0];
            
            const message = `✓ Added to Cart!\n\nSubscription: ${subscriptionType}\nFragrance(s): ${fragranceNames.join(', ')}\nPrice: ${price}`;
            alert(message);
            
            addToCartBtn.textContent = '✓ Added to Cart!';
            addToCartBtn.style.background = '#10b981';
            
            setTimeout(() => {
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.style.background = '#1a5d3a';
            }, 2000);
        }
    });
}

if (mainImage) {
    mainImage.style.transition = 'opacity 0.3s ease';
}

const productSection = document.querySelector('.product-section');
if (productSection) {
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    productSection.style.opacity = '0';
    productSection.style.transform = 'translateY(30px)';
    productSection.style.transition = 'all 0.8s ease';
    productObserver.observe(productSection);
}

const collectionSection = document.querySelector('.collection-section');
if (collectionSection) {
    const collectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    collectionSection.style.opacity = '0';
    collectionSection.style.transform = 'translateY(30px)';
    collectionSection.style.transition = 'all 0.8s ease';
    collectionObserver.observe(collectionSection);
}


const newsletterBtn = document.querySelector('.newsletter-btn');
const newsletterInput = document.querySelector('.newsletter-input');

if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterInput.value.trim();
        
        if (email === '') {
            alert('Please enter your email address');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert(`✓ Thank you for subscribing!\n\nYou'll receive updates at: ${email}`);
        
        newsletterBtn.textContent = '✓ Subscribed!';
        newsletterBtn.style.background = '#10b981';
        newsletterBtn.style.color = 'white';
        newsletterInput.value = '';
        newsletterInput.disabled = true;
        
        setTimeout(() => {
            newsletterBtn.textContent = 'Subscribe';
            newsletterBtn.style.background = 'white';
            newsletterBtn.style.color = '#1a5d3a';
            newsletterInput.disabled = false;
        }, 3000);
    });
    
    // Allow Enter key to submit
    newsletterInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            newsletterBtn.click();
        }
    });
}

const tableRows = document.querySelectorAll('.table-row');
if (tableRows.length > 0) {
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
            }
        });
    }, {
        threshold: 0.2
    });
    
    tableRows.forEach((row) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.5s ease';
        tableObserver.observe(row);
    });
}


console.log('GTG Perfume Website - Loaded Successfully!');
console.log('All interactive features initialized ✓');
console.log('===========================================');
console.log('Features Available:');
console.log('✓ Mobile Navigation Menu');
console.log('✓ Smooth Scrolling');
console.log('✓ Hero Section Animations');
console.log('✓ Collection Accordion');
console.log('✓ Statistics Section with Counter Animation');
console.log('✓ Product Gallery Navigation');
console.log('✓ Subscription Selection');
console.log('✓ Fragrance Selection');
console.log('✓ Add to Cart Functionality');
console.log('===========================================');