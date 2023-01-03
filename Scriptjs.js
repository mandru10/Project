//Search bar

const searchForm = document.getElementById("searchForm");
let allReplacedElements = [];

searchForm.onsubmit = (e) => {
    e.preventDefault();

    allReplacedElements.forEach(item => {
        item.elementJs.innerHTML = item.elementHTML
    })
    allReplacedElements = [];

    const searchInput = document.getElementById("search");
    const searchValue = searchInput.value;
    const searchValueLowerCase = searchValue.toLowerCase();

    let firstFoundElement = null;
    let indexFoundElement = 0;
    
    document.querySelectorAll('*:not(:has(*))').forEach((element) => {
        const elementInnerHtml = element.innerHTML;
        const isSearchValue = elementInnerHtml.toLowerCase().search(searchValueLowerCase);

        if (isSearchValue !== -1) {
            if (!indexFoundElement) {
                firstFoundElement = element;
                indexFoundElement = 1;
            }

            const searchRegex = new RegExp(searchValue, 'gi');
            const replacedInnerHtml = elementInnerHtml.replace(searchRegex, (match) => `<mark>${match}</mark>`);

            allReplacedElements.push({
                elementJs: element,
                elementHTML: element.innerHTML
            })

            element.innerHTML = replacedInnerHtml;
        }
    })

    firstFoundElement && firstFoundElement.scrollIntoView({behavior:'smooth'})
}

//More information button

const moreInformationButton = document.getElementById("aboutButtonExtend");

moreInformationButton.onclick = (e) => {
    const moreInformationText = document.getElementById("moreInformationText");

    const moreInfoTextIsHidden = moreInformationText.classList.contains('none');
    if (moreInfoTextIsHidden) {
        moreInformationButton.innerHTML = 'Hide Information';
        moreInformationText.classList.remove('none')
    } else {
        moreInformationButton.innerHTML = 'More Information';
        moreInformationText.classList.add('none')
    }
}

// 