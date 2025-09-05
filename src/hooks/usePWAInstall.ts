import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar si ya está instalado
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Registrar Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado exitosamente:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar Service Worker:", error);
        });
    }

    // Escuchar evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
      e.preventDefault();
      // Guardar el evento para usarlo más tarde
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Escuchar cuando la app es instalada
    const handleAppInstalled = () => {
      console.log("PWA instalada exitosamente");
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      // Mostrar el prompt de instalación
      await deferredPrompt.prompt();

      // Esperar a que el usuario responda al prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("Usuario aceptó instalar la PWA");
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      } else {
        console.log("Usuario rechazó instalar la PWA");
        return false;
      }
    } catch (error) {
      console.error("Error al instalar PWA:", error);
      return false;
    }
  };

  const dismissInstallPrompt = () => {
    setIsInstallable(false);
    setDeferredPrompt(null);
  };

  return {
    isInstallable,
    isInstalled,
    installPWA,
    dismissInstallPrompt,
    isSupported: "serviceWorker" in navigator,
  };
};
