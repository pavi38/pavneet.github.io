function splitScroll(){
    const controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        duration : '200%',
        triggerElement : '.about-title',
        triggerHook: 0
    })
    .setPin('.about-title')
    .addTo(controller);
    
    new ScrollMagic.Scene({
        duration : '200%',
        triggerElement : '.right-title',
        triggerHook: 0
    })
    .setPin('.right-title')
    .addTo(controller);
    new ScrollMagic.Scene({
        duration : '200%',
        triggerElement : '.two',
        triggerHook: 0
    })
    .setPin('.two')
    .addTo(controller);
}
function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                            }
                        });
                    },
                    { threshold: 0.2 }
                );
                observer.observe(video);
            });
        }
    });
}

// And you would kick this off where appropriate with:
playPauseVideo();
splitScroll();