const container = document.querySelector(".comp-stat-container");
const statContainers = document.querySelectorAll(".comp-stat");
const clicktoExpand = document.querySelectorAll(".bg5 .bg5-collapse-head");
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
    document.querySelector(".sidebar").style.display = "block"
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
    console.log("opened")
}

const closeSidebar = () =>{
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector("header").style.display = "grid";
    document.querySelector("main").style.display = "flex";
    console.log("closed")
}