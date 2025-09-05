// Utilidades para feedback háptico y mejoras de UX mobile

export const hapticFeedback = {
  // Vibración ligera para feedback de tap
  light: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  },

  // Vibración media para notificaciones
  medium: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
  },

  // Vibración intensa para errores o éxito importante
  heavy: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  },

  // Patrón de éxito
  success: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  },

  // Patrón de error
  error: () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 100, 100, 100, 100]);
    }
  },
};

// Utilidades para detección de dispositivo
export const deviceUtils = {
  // Detectar si es un dispositivo móvil
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  // Detectar si es iOS
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },

  // Detectar si es Android
  isAndroid: () => {
    return /Android/i.test(navigator.userAgent);
  },

  // Detectar si está en modo standalone (PWA instalada)
  isStandalone: () => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    );
  },

  // Obtener información del viewport
  getViewportInfo: () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.screen?.orientation?.type || "unknown",
    };
  },
};

// Utilidades para performance en mobile
export const mobilePerformance = {
  // Lazy loading de imágenes
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });
      observer.observe(img);
    } else {
      // Fallback para navegadores sin soporte
      img.src = src;
    }
  },

  // Throttle para eventos de scroll
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Debounce para inputs
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  },
};

// Utilidades para accesibilidad
export const a11yUtils = {
  // Anunciar texto a lectores de pantalla
  announce: (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    announcement.style.width = "1px";
    announcement.style.height = "1px";
    announcement.style.overflow = "hidden";

    document.body.appendChild(announcement);
    announcement.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Focus trap para modales
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }

      if (e.key === "Escape") {
        element.dispatchEvent(new CustomEvent("modal-close"));
      }
    };

    element.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleTab);
    };
  },
};
