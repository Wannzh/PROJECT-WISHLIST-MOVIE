// icon slider-home
const btns = document.querySelectorAll('.slider-home')
const text = document.querySelectorAll('.slide-text')

var sliderNav = function(manual){
    btns.forEach((btn) => {
        btn.classList.remove("active")
    })

    text.forEach((teks) => {
        teks.classList.remove("active")
    })

    btns[manual].classList.add("active");
    text[manual].classList.add("active");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    })
})

