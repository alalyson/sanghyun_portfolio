document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for the fixed shellbar
        const offset = 60;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Shellbar shadow on scroll
  const shellbar = document.querySelector('.fiori-shellbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      shellbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
      shellbar.style.boxShadow = 'none';
  });
});

// Modal Logic
function openModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  if (modal && modalImg) {
    modal.style.display = 'flex';
    modalImg.src = src;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
  }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});
