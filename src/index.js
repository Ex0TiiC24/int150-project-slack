const container = document.querySelector(".comp-stat-container");
const statContainers = document.querySelectorAll(".comp-stat");
const clicktoExpand = document.querySelectorAll(".bg5 .bg5-collapse-head");
const slider = document.querySelectorAll(".bg3-navi svg");
const card = document.querySelectorAll(".card-slide")

let activated = false;

const updateCount = () => {
    console.log("activated");
    statContainers.forEach((statContainer) => {
        const statDiv = statContainer.querySelector(".stat");
        const h1 = statDiv.querySelector("h1");

        const target = parseInt(h1.dataset.count);
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            h1.textContent = Math.floor(current);
        }, 50);
    });
};

const runningNumbers = () => {
    const rect = container.getBoundingClientRect();

    if (
        (rect.top >= 0 && rect.top <= window.innerHeight) ||
        (rect.bottom >= 0 && rect.bottom <= window.innerHeight)
    ) {
        if (!activated) {
            activated = true;
            updateCount();
        }
    } else if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (activated) {
            activated = false;
            console.log("unactive");
        }
    }
};
window.addEventListener("scroll", () => {
    runningNumbers();
});

const expandCollapsed = () => {
    clicktoExpand.forEach((collapse, i) => {
        collapse.addEventListener("click", () => {
            clicktoExpand.forEach((otherCollapse, k) => {
                if (i !== k) {
                    let otherContent = otherCollapse.querySelector(".bg5-collapse-item");
                    otherContent.style.display = "none";
                }
            });

            let content = collapse.querySelector(".bg5-collapse-item");
            if (content.style.display === "block" || content.style.display === "flex") {
                content.style.display = "none";
                console.log(i, "closed");
            } else {
                content.style.display = "flex";
                console.log(i, "open");
            }
        });
    });
};

expandCollapsed()

const openSidebar = () =>{
    document.querySelector(".sidebar").style.right = "0%"


    console.log("opened")
}

const closeSidebar = () =>{
    document.querySelector(".sidebar").style.right= "-100%";
   
    console.log("closed")
}

const sliderController = () => {
    slider.forEach((button, i) => {
        button.addEventListener("click", () => {
            card.forEach((cardEl, k) => {

                cardEl.style.display = (i === k) ? "flex" : "none";
            });
    
            slider.forEach((btn, idx) => {
                let btnPath = btn.querySelector("path");
                if (i === idx) {
                    btnPath.style.fill = "#45144b"; // active color
                } else {
                    btnPath.style.fill = "#acacac"; // inactive color
                }
            });
        });
    });
}

sliderController();


function handleVideoPlayback(x) {
  const video = document.querySelector('.wherework');
  if (x.matches) {
    video.loop = true;
    video.play();
  } else {
    video.pause();
  }
}






document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll('.video-sroller .video video');
  const vidbg = document.getElementById('vidbg');
  const scroller = document.querySelector('.video-sroller');
  const stickyTop = 120; // px from top of viewport (adjust as needed)

  // Intersection Observer for video animations
  if (videos.length && vidbg) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('disappear');
          } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('disappear');
          }
        });
      },
      {
        threshold: 0.5 // 50% of video in viewport
      }
    );

    videos.forEach(video => {
      observer.observe(video);
    });

    // Optional: Change vidbg color based on which video is visible
    const colors = ['#41b658', '#fcc003', '#1ab9ff', '#9602c7'];
    window.addEventListener('scroll', () => {
      videos.forEach((video, idx) => {
        const rect = video.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          const path = vidbg.querySelector('path');
          if (path) path.setAttribute('fill', colors[idx] || '#41b658');
        }
      });
    });
  }

function updateVidbgPosition() {
  if (!vidbg || !scroller) return;
  const vidbgHeight = vidbg.getBoundingClientRect().height;
  const scrollerRect = scroller.getBoundingClientRect();
  const scrollerTop = scrollerRect.top + window.scrollY;
  const scrollerHeight = scroller.offsetHeight;

  const minTop = 0;
  const maxTop = scrollerHeight - vidbgHeight;
  const scrollY = window.scrollY;

  // Calculate the scroll position at which the SVG should start and stop sticking
  const startStick = scrollerTop - stickyTop;
  const endStick = scrollerTop + scrollerHeight - vidbgHeight - stickyTop;

  let newTop;

  if (scrollY < startStick) {
    // Before sticky zone: pin to top of container
    newTop = minTop;
  } else if (scrollY > endStick) {
    // After sticky zone: pin to bottom of container
    newTop = maxTop;
  } else {
    // While sticky: stick to viewport at stickyTop
    newTop = scrollY - scrollerTop + stickyTop;
  }

  vidbg.style.top = newTop + "px";
}

  window.addEventListener('scroll', updateVidbgPosition);
  window.addEventListener('resize', updateVidbgPosition);
  updateVidbgPosition();


});