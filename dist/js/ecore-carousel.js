/*! ECORE-JS-Carousel v0.0.1 | (c) 2021 Edward Margallo | MIT License | https://github.com/edwardm/ECORE-JS-Carousel */
/* jshint esversion: 6 */

/* to-do - need to refactor */

window.onload = function () {
    // set variables
    let galleryContainer = document.getElementsByClassName("gallery-container");
    let galleryControls = document.getElementsByClassName("gallery-controls");
    let galleryCount = document.getElementsByClassName("gallery-item").length;
    let galleryItemFirst = document.getElementsByClassName("gallery-item")[0];
    let activeIndex = 0;
    let pagers;
    let galleryItem;
    let galleryPageItem;
    let galleryItemActive;
    let galleryPrev;
    let galleryNext;

    // testing output
    console.log("galleryCount: " + galleryCount); // check how many items total
    console.log("Image SRC of active item: " + galleryItemFirst.src); // check the first img item
    console.log("activeIndex: " + activeIndex); // check how many items total

    galleryContainer[0].setAttribute("data-index", activeIndex);

    galleryItemFirst.classList.add("active");

    // pager function
    // on click
    // - active class
    // - animate
    // - check if last or first?

    pagers = [document.getElementsByClassName("gallery-item")];
    console.log(pagers);

    // build the pagination

    for (let i = 0; i < galleryCount; i++) {
        // this gallery item
        galleryItem = document.getElementsByClassName("gallery-item")[i];
        galleryItem.classList.add("gallery-item-" + [i]);
        galleryItem.setAttribute("data-index", [i]);

        // testing output
        console.log(i); // take a look at the index
        console.log(galleryItem); // take a look at which img

        // create a pager item for this gallery item
        galleryPageItem = document.createElement("span");

        // if first one, apply active class by default
        if (i === 0) {
            galleryPageItem.setAttribute(
                "class",
                "gallery-pager-item gallery-item-" + [i] + " active"
            );
        } else {
            galleryPageItem.setAttribute(
                "class",
                "gallery-pager-item gallery-item-" + [i] + ""
            );
        }

        // add a data-index attr for referencing purposes
        // so we know which to target correspondingly
        galleryPageItem.setAttribute("data-index", [i]);

        // let galleryPageItem = '<span class="gallery-pager-item gallery-item-' + [i + 1] + '></span>';

        // render the new pager item to the DOM
        // testing output
        //console.log("pager to render: " + galleryPageItem); // take a look at the html built
        galleryControls[0].appendChild(galleryPageItem);

        // pagination clicks
        paginationClick = function () {
            // remove all actives
            for (let i = 0; i < galleryCount; i++) {
                galleryPageItem = document.getElementsByClassName(
                    "gallery-pager-item"
                )[i];
                galleryPageItem.classList.remove("active");
            }

            for (let i = 0; i < galleryCount; i++) {
                galleryItem = document.getElementsByClassName("gallery-item")[
                    i
                ];
                galleryItem.classList.remove("active");
            }

            // add active to the current clicked
            let _this = this;
            let _thisIndex = this.getAttribute("data-index");
            _this.classList.add("active");

            activeIndex = _thisIndex;

            galleryContainer[0].setAttribute("data-index", activeIndex);

            pagerArrowChecking();

            console.log("pager item clicked activeIndex: " + activeIndex);

            galleryItemActive = document.getElementsByClassName("gallery-item")[
                _thisIndex
            ];
            galleryItemActive.classList.add("active");
        };

        galleryPageItem.addEventListener("click", paginationClick);
    }

    // build previous and next pager buttons

    galleryPrev = document.createElement("span");
    galleryPrev.setAttribute("class", "gallery-prev");

    galleryNext = document.createElement("span");
    galleryNext.setAttribute("class", "gallery-next");

    galleryControls[0].appendChild(galleryPrev);
    galleryControls[0].appendChild(galleryNext);

    function resetAndApplyActives() {
        galleryContainer[0].setAttribute("data-index", activeIndex);

        // remove all actives
        for (let i = 0; i < galleryCount; i++) {
            galleryPageItem = document.getElementsByClassName(
                "gallery-pager-item"
            )[i];
            galleryPageItem.classList.remove("active");
        }

        for (let i = 0; i < galleryCount; i++) {
            let galleryItem = document.getElementsByClassName("gallery-item")[
                i
            ];
            galleryItem.classList.remove("active");
        }

        galleryItemActive = document.getElementsByClassName("gallery-item")[
            activeIndex
        ];
        galleryItemActive.classList.add("active");

        galleryPageItem = document.getElementsByClassName("gallery-pager-item")[
            activeIndex
        ];
        galleryPageItem.classList.add("active");
    }

    /* make the prev and next "disabled" when the activeIndex is
	  at the beginning or end. I couldn't quite get to the BONUS :( */
    function pagerArrowChecking() {
        galleryContainer[0].setAttribute("data-index", activeIndex);

        if (activeIndex == 0) {
            /* at the beginning */
            galleryPrev.style.pointerEvents = "none";
            galleryPrev.classList.add("disabled");
        } else if (activeIndex == galleryCount - 1) {
            /* at the end */
            galleryNext.style.pointerEvents = "none";
            galleryNext.classList.add("disabled");
        } else {
            /* somewhere in the middle */
            galleryPrev.style.pointerEvents = "auto";
            galleryPrev.classList.remove("disabled");
            galleryNext.style.pointerEvents = "auto";
            galleryNext.classList.remove("disabled");
        }
    }
    pagerArrowChecking();

    galleryPrevClick = function () {
        console.log("galleryPrev clicked prevIndex: " + activeIndex);

        activeIndex--; // previous so minus one
        resetAndApplyActives();
        pagerArrowChecking();

        console.log("new activeIndex: " + activeIndex);
    };
    galleryPrev.addEventListener("click", galleryPrevClick);

    galleryNextClick = function () {
        console.log("galleryNext clicked prevIndex: " + activeIndex);

        activeIndex++; // next so add one
        resetAndApplyActives();
        pagerArrowChecking();

        console.log("new activeIndex: " + activeIndex);
    };
    galleryNext.addEventListener("click", galleryNextClick);
};
