function scrollanimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });











    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
scrollanimation()
function navBarAnimation(){
    gsap.to('#nav-part1 svg', {
        transform: 'translateY(-100%)',
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#main',
            start: 'top 0%',
            end: 'top -5%',
            scrub: true
    
        }
    })
    gsap.to('#nav-part2 #links', {
        transform: 'translateY(-100%)',
        opacity:0,
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#main',
            start: 'top 0%',
            end: 'top -5%',
            scrub: true
    
        }
    })
}
navBarAnimation()

let tl = gsap.timeline()
let page2 = document.querySelector('#page2')
let h3 = document.querySelector('#page2 h3')
tl.from('#page1 h1', {
    y: 100,
    delay: 1,
    opacity: 0,
    stagger: .4
})
tl.from('#page2 img', {
    y: 100,
    delay: .4,
    scale: .7,
    opacity: 0,
    stagger: .4,
})


page2.addEventListener('mouseenter', function () {
    gsap.to(h3, {
        opacity: 1,
    })
})
page2.addEventListener('mouseleave', function () {
    gsap.to(h3, {
        opacity: 0,
    })
})
page2.addEventListener('mousemove', function (e) {
    gsap.to('#page2 h3', {
        left: e.x - 10,
        opacity: 1,
        top: e.y - 30,
    })
})
document.querySelector('#page5').addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
        left: dets.x,
        top: dets.y,
        transform: 'translate(-50%, -50%) scale(1)',

    });
});
document.querySelector('#page5').addEventListener("mouseleave", function (dets) {
    gsap.to("#cursor", {
        left: dets.x,
        top: dets.y,
        transform: 'translate(-50%, -50%) scale(0)',

    });
});


