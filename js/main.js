document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate position to center the element in the viewport
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        
        const elementHeight = targetElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        let offsetPosition = elementPosition - (viewportHeight / 2) + (elementHeight / 2);
        
        // If element is very tall, align it near the top instead of center so the header isn't hidden
        if (elementHeight > viewportHeight * 0.8) {
          offsetPosition = elementPosition - (viewportHeight * 0.15);
        }

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Highlight the target section for visibility
        document.querySelectorAll('.highlight-active').forEach(el => el.classList.remove('highlight-active'));
        if (targetElement.classList.contains('fiori-card')) {
          targetElement.classList.add('highlight-active');
        }
      }
    });
  });

  // Remove highlight on manual interaction
  const clearHighlights = () => {
    document.querySelectorAll('.highlight-active').forEach(el => {
      el.classList.remove('highlight-active');
    });
  };

  window.addEventListener('wheel', clearHighlights, { passive: true });
  window.addEventListener('touchmove', clearHighlights, { passive: true });
  window.addEventListener('mousedown', clearHighlights);
  window.addEventListener('keydown', clearHighlights);

  // Shellbar shadow on scroll
  const shellbar = document.querySelector('.fiori-shellbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      shellbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
      shellbar.style.boxShadow = 'none';
    }
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
    modal.classList.add('closing');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('closing');
      document.body.style.overflow = 'auto'; // Restore background scrolling
    }, 280); // Wait for the 0.3s fadeOut animation to finish
  }
}

// Close modal when clicking outside or on the image
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      // Close if clicking the background overlay or the image itself
      if (e.target === modal || e.target.id === 'modalImage') {
        closeModal();
      }
    });
  }
});
