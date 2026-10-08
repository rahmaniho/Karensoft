"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Howler } from "howler";
import { playSound, unlockAudio, type SoundName } from "@/lib/sounds";

const STORAGE_KEY = "karensoft-sound";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue>({ enabled: false, toggle: () => {}, play: () => {} });

/** خواندن وضعیت کلید صدا از حافظهٔ مرورگر (فقط سمت کلاینت) */
function readPreference(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? null : raw === "on";
  } catch {
    return null;
  }
}

/**
 * فراهم‌کنندهٔ افکت‌های صوتی.
 * صدا تا اولین تعامل کاربر با صفحه فعال نمی‌شود تا سیاست Autoplay مرورگر نقض نشود.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = readPreference();
    if (stored === false) return;

    const unlock = () => {
      const ready = unlockAudio();
      setEnabled(stored ?? ready);
    };
    unlock();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    Howler.volume(enabled ? 1 : 0);
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        /* حالت خصوصی مرورگر */
      }
      if (next) {
        unlockAudio();
        playSound("success");
      } else {
        playSound("toggle", 0.2);
      }
      return next;
    });
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      playSound(name);
    },
    [enabled],
  );

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);
  // پیش از mount، صدا همیشه خاموش است تا سرور و کلاینت یکسان رندر شوند.
  void mounted;
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSoundFx(): SoundContextValue {
  return useContext(SoundContext);
}
