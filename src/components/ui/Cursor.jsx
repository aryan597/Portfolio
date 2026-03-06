import React, { useEffect, useRef } from 'react';

export const Cursor = () => {
    const dot = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        let raf;

        const onMove = (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
        };

        const animate = () => {
            // Ring lerps to dot position
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;

            if (dot.current) dot.current.style.transform = `translate(${dotX - 3.5}px, ${dotY - 3.5}px)`;
            if (ring.current) ring.current.style.transform = `translate(${ringX - 19}px, ${ringY - 19}px)`;
            raf = requestAnimationFrame(animate);
        };

        const onEnter = () => {
            dot.current?.classList.add('hovered');
            ring.current?.classList.add('hovered');
        };
        const onLeave = () => {
            dot.current?.classList.remove('hovered');
            ring.current?.classList.remove('hovered');
        };

        window.addEventListener('mousemove', onMove);
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={dot} className="cursor-dot" />
            <div ref={ring} className="cursor-ring" />
        </>
    );
};
