const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const mainContent = document.querySelector(".main-content");

sidebar.addEventListener("mouseenter", () => {
    sidebar.classList.remove("close");
    mainContent.style.marginLeft = "196px"; 
});

sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.add("close");
    mainContent.style.marginLeft = "80px";  
});

submenuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        item.classList.toggle("show_submenu");
        submenuItems.forEach((item2, index2) => {
            if (index !== index2) {
                item2.classList.remove("show_submenu");
            }
        });
    });
});

if (window.innerWidth < 768) {
    sidebar.classList.add("close");
    mainContent.style.marginLeft = "0"; 
} else {
    sidebar.classList.remove("close");
    mainContent.style.marginLeft = "260px"; 
}