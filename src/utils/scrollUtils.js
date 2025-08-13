// Smooth scroll utilities

/**
 * Smooth scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from top (default: 80px for header)
 */
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};

/**
 * Smooth scroll within container
 * @param {HTMLElement} container - Container element
 * @param {HTMLElement} target - Target element to scroll to
 * @param {number} offset - Offset from container top
 */
export const scrollWithinContainer = (container, target, offset = 20) => {
  if (container && target) {
    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const targetTop = target.offsetTop;
    const targetHeight = target.clientHeight;
    
    if (targetTop < containerTop + offset) {
      container.scrollTo({
        top: targetTop - offset,
        behavior: 'smooth'
      });
    } else if (targetTop + targetHeight > containerTop + containerHeight - offset) {
      container.scrollTo({
        top: targetTop + targetHeight - containerHeight + offset,
        behavior: 'smooth'
      });
    }
  }
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get scroll position percentage
 * @returns {number} - Scroll percentage (0-100)
 */
export const getScrollPercentage = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return Math.round((scrollTop / scrollHeight) * 100);
};

/**
 * Debounced scroll handler
 * @param {Function} callback - Callback function to execute
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounceScroll = (callback, delay = 100) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(null, args), delay);
  };
};

/**
 * Add scroll-based animations
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS class to add when in viewport
 */
export const addScrollAnimation = (element, animationClass = 'animate-fade-in') => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );
  
  if (element) {
    observer.observe(element);
  }
  
  return observer;
};
