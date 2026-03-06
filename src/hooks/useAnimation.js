import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Returns spring-smoothed mouse X/Y motion values (normalised -0.5 to 0.5).
 * Used for cursor parallax on backgrounds and hero elements.
 */
export function useMouseParallax() {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    const x = useSpring(rawX, { stiffness: 60, damping: 20 });
    const y = useSpring(rawY, { stiffness: 60, damping: 20 });

    useEffect(() => {
        const handler = (e) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener('mousemove', handler);
        return () => window.removeEventListener('mousemove', handler);
    }, [rawX, rawY]);

    return { x, y };
}

/**
 * 3-D tilt effect. Returns props to spread onto a motion element.
 */
export function useTilt(max = 12) {
    const ref = useRef(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);

    const rotateX = useSpring(rx, { stiffness: 300, damping: 30 });
    const rotateY = useSpring(ry, { stiffness: 300, damping: 30 });

    const onMouseMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const px = (e.clientX - left) / width - 0.5;
        const py = (e.clientY - top) / height - 0.5;
        rx.set(-py * max);
        ry.set(px * max);
    };

    const onMouseLeave = () => { rx.set(0); ry.set(0); };

    return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/**
 * Shared scroll-reveal variant factory.
 */
export const revealVariants = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
};

export const staggerParent = (stagger = 0.1) => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
});

export const revealTransition = (delay = 0) => ({
    duration: 0.75,
    ease: [0.16, 1, 0.3, 1],
    delay,
});
