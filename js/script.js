document.addEventListener("DOMContentLoaded", () => {
    // GNB
    const header = document.querySelector("#header");
    const gnb = document.querySelector(".gnb");

    gnb.addEventListener("mouseenter", () => {
        header.classList.add("active");
    });

    gnb.addEventListener("mouseleave", () => {
        header.classList.remove("active");
    });

    // 커서 움직이기
    let x = 0,
        y = 0;

    const visual = document.querySelector(".visual");
    const cursor = document.querySelector(".cursor");

    gsap.set(cursor, { autoAlpha: 0, scale: 0.3 });

    visual.addEventListener("mousemove", (e) => {
        // console.log(e);
        x = e.pageX;
        y = e.pageY;

        gsap.to(cursor, { left: x, top: y });
    });

    visual.addEventListener("mouseenter", () => {
        gsap.to(cursor, { autoAlpha: 1, scale: 1 });
    });
    visual.addEventListener("mouseleave", () => {
        gsap.to(cursor, { autoAlpha: 0, scale: 0.3 });
    });

    new Swiper(".visual-slider", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        speed: 1200,
        effect: "fade", // ← 페이드 효과 적용
        fadeEffect: {
            crossFade: true, // 겹치듯 자연스럽게 전환
        },
    });

    // const menuSlider = new Swiper(".menu-slider", {
    //     // slidesPerView: 4,
    //     slidesPerView: "auto", //css에서 가로크기를 부여
    //     // centeredSlides: true,
    //     spaceBetween: 20,
    //     loop: true,
    //     autoplay: {
    //         delay: 1000,
    //     },
    //     speed: 2600,

    //     breakpoints: {
    //         600: {
    //             slidesPerView: 1.5, // 모바일에서 1.5개 보이게
    //         },
    //     },
    // });

    const menuSlider = new Swiper(".menu-slider", {
        slidesPerView: 1.5,
        centeredSlides: true, // 가운데 정렬
        spaceBetween: 15, // 슬라이드 간 간격
        loop: true,
        autoplay: {
            delay: 1000,
        },
        speed: 2600,

        breakpoints: {
            // PC (1024px 이상)
            1024: {
                slidesPerView: "auto",
                centeredSlides: false,
            },
            // 태블릿 (600px ~ 1023px)
            600: {
                slidesPerView: 3,
                centeredSlides: false,
            },
        },
    });

    const eventSlider = new Swiper(".event-slider", {
        // slidesPerView: 3,
        slidesPerView: "auto", //css에서 가로크기를 부여
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
        },
        speed: 2600,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
        },

        // breakpoints: {
        //     // PC (1024px 이상)
        //     1024: {
        //         slidesPerView: "auto",
        //         centeredSlides: false,
        //     },
        //     // 태블릿 (600px ~ 1023px)
        //     600: {
        //         slidesPerView: 3,
        //         centeredSlides: false,
        //     },
        // },
    });

    // GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    //brand
    gsap.from(".brand-con figure", {
        clipPath: "inset(50% 0)",
        duration: 1.6,
        ease: "power2.inOut",

        scrollTrigger: {
            trigger: ".brand-con figure",
            // markers: true,
            start: "top 70%",
            toggleActions: "play none reverse none",
        },
    });

    //franchsie
    gsap.from(".franchsie-con figure", {
        clipPath: "inset(50% 0)",
        duration: 1.6,
        ease: "power2.inOut",

        scrollTrigger: {
            trigger: ".franchsie-con figure",
            // markers: true,
            start: "top 70%",
            toggleActions: "play none reverse none",
        },
    });

    // noticeList로 바꾸기

    // 대상을 변수에 저장
    const picList = document.querySelector(".notice-list");
    const list = Array.from(picList.querySelectorAll("li"));
    const imgBox = document.querySelector(".img-box");

    // 초기 세팅
    gsap.set(imgBox, { opacity: 0, scale: 0.8 });

    // PC 사이즈에서만 실행
    if (window.innerWidth > 1024) {
        showImage();
        followImage();
    }

    // 애니메이션을 위한 타임라인 설정
    const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power4.inOut" },
    });

    tl.from(
        list,
        {
            opacity: 0,
            transformOrigin: "0 0",
            y: 50,
            stagger: 0.2,
            duration: 2,
            ease: "bounce.out",
            onComplete: () => {
                showImage();
                followImage();
            },
        },
        "<"
    );

    // 사진 나오게 하기
    function showImage() {
        list.forEach((li, index) => {
            li.addEventListener("mouseenter", () => {
                imgBox.innerHTML = `<img src="./img/notice0${index + 1}.png"/>`;
                gsap.to(imgBox, { opacity: 1, scale: 1 });
            });
        });

        picList.addEventListener("mouseleave", () => {
            gsap.to(imgBox, { opacity: 0, scale: 0.8 });
        });
    }

    // 따라다니게 하기
    function followImage() {
        let x = 0;
        let y = 0;
        let mx = 0;
        let my = 0;
        const speed = 0.09;

        picList.addEventListener("mousemove", (e) => {
            x = e.pageX;
            y = e.pageY;
        });

        function moving() {
            mx += (x - mx) * speed;
            my += (y - my) * speed;

            gsap.to(imgBox, {
                left: mx,
                top: my,
                rotation: -mx * 0.02,
                transformOrigin: "0 0",
                scale: mx * 0.001,
            });

            requestAnimationFrame(moving);
        }

        moving();
    }

    // TOP 버튼
    const btnTop = document.querySelector(".btn-top");
    gsap.from(btnTop, {
        autoAlpha: 0,
        scrollTrigger: {
            trigger: ".event",
            // markers: true,
            start: "top 70%",
            toggleActions: "play none play reverse",
        },
    });

    // 클릭했을 때 상단으로 이동
    btnTop.addEventListener("click", () => {
        gsap.to(window, { duration: 1, scrollTo: 0 });
    });
});
