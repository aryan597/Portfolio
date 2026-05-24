import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalJourney({ children }) {

    const wrapperRef = useRef(null);
    const trackRef = useRef(null);
    const scrollTweenRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    /* ------------------------------
       Detect Mobile Layout
    ------------------------------*/
    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);

    }, []);


    /* ------------------------------
       Horizontal Scroll Setup
    ------------------------------*/
    useEffect(() => {

        if (!wrapperRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const sections = gsap.utils.toArray(track.children);
        const totalSections = sections.length;

        /* MOBILE MODE
           fallback to vertical scroll
        */
        if (isMobile) {

            ScrollTrigger.getAll().forEach(t => t.kill(true)); // true completely reverts the DOM and removes pin-spacers
            if (wrapperRef.current) gsap.set(wrapperRef.current, { clearProps: "all", overflow: "visible" });
            if (trackRef.current) gsap.set(trackRef.current, { clearProps: "all", willChange: "auto" });
            document.body.style.overflow = "auto";
            return;
        }


        /* DESKTOP HORIZONTAL MODE */

        gsap.set(sections, {
            opacity: 0.4,
            y: 40,
            scale: 0.9
        });

        gsap.set(sections[0], {
            opacity: 1,
            y: 0,
            scale: 1
        });


        const getScrollDistance = () =>
            track.scrollWidth - window.innerWidth;


        scrollTweenRef.current = gsap.to(track, {

            x: () => -getScrollDistance(),
            ease: "none",

            scrollTrigger: {

                trigger: wrapperRef.current,
                start: "top top",
                end: () => "+=" + getScrollDistance(),

                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                snap: {
                    snapTo: 1 / (totalSections - 1),
                    duration: 0.45,
                    ease: "power2.inOut"
                },

                onUpdate: (self) => {

                    const activeIndex =
                        Math.round(self.progress * (totalSections - 1));

                    window.dispatchEvent(
                        new CustomEvent("horizontal-scroll-update", {
                            detail: { activeIndex }
                        })
                    );

                    sections.forEach((section, i) => {

                        if (i === activeIndex) {

                            gsap.to(section, {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.6,
                                ease: "power3.out",
                                overwrite: "auto"
                            });

                        } else {

                            gsap.to(section, {
                                opacity: 0.35,
                                y: 30,
                                scale: 0.9,
                                duration: 0.6,
                                ease: "power3.out",
                                overwrite: "auto"
                            });

                        }

                    });

                }

            }

        });


        ScrollTrigger.refresh();


        return () => {

            if (scrollTweenRef.current) {
                scrollTweenRef.current.kill();
            }

            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === wrapperRef.current) {
                    trigger.kill();
                }
            });

        };

    }, [isMobile]);


    /* ------------------------------
       Layout
    ------------------------------*/

    return (

        <div
            ref={wrapperRef}
            style={{
                width: "100%",
                height: "100%",
                overflow: isMobile ? "visible" : "hidden",
                position: "relative"
            }}
        >

            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    width: isMobile ? "100%" : "max-content",
                    willChange: isMobile ? "auto" : "transform"
                }}
            >

                {React.Children.map(children, (child) => (

                    <section
                        className="horizontal-section"
                        style={{
                            flex: isMobile ? "none" : "0 0 100vw",
                            width: isMobile ? "100%" : "100vw",
                            height: isMobile ? "auto" : "100vh",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        {child}

                    </section>

                ))}

            </div>

        </div>

    );

}