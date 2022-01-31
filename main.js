// VARIABLES
const burgerMenu = document.getElementById('burgerMenu');
const xMenu = document.getElementById('x-menu');
const mobileNavHeader = document.querySelector('.mobile-nav-header');
const mobileNavFooter = document.querySelector('.mobile-nav-footer');
const navigationWrapper = document.querySelector('.navigation-wrapper');
const body = document.querySelector('body');
const categorySelect = document.querySelector("#inputCategory");
const subCategorySelect = document.querySelector("#inputSubcategory");

// LISTENERS
 categorySelect.addEventListener("change", handleCategoryChange);
 subCategorySelect.addEventListener("change", handleSubcategoryChance);
 burgerMenu.addEventListener('click', toggleMobileMenu);

(function init() {
  fetch("https://run.mocky.io/v3/0b8fbded-6ce4-4cb2-bf2f-d2c39207506b")
    .then((response) => response.json())
    .then((data) => populateCategorySelect(data))
    .catch((error) => {
      console.warn(error);
      // Here we could handle the error by logging in somewhere
      // and showing a message to the user.
    });
})();

function toggleMobileMenu() {
  if (navigationWrapper.classList.contains('hidden')) {

    xMenu.addEventListener('click', toggleMobileMenu)
  } else {
    xMenu.removeEventListener('click', toggleMobileMenu)
  }
  navigationWrapper.classList.toggle('hidden')
  mobileNavHeader.classList.toggle('hidden')
  mobileNavFooter.classList.toggle('hidden')
  body.classList.toggle('scroll-disabled')
}

function populateCategorySelect(options) {
  options.forEach(item => {
    // Create and prepare an option element
    const option = document.createElement("option");
    option.value = item.categoryId;
    option.text = item.name;

    // Also set the subcategories for each option as a data attribute.
    // We need this to populate the subcategory select later.
    // We stringify it so it can be saved as a string in the data attribute and parsed later.
    option.setAttribute(
      "data-subcategories",
      item.subCategories ? JSON.stringify(item.subCategories) : ""
    );

    // Append the option to the select element
    categorySelect.appendChild(option);
  });
}

function populateSubcategorySelect(options) {
  // First clear the existing options
  while (subCategorySelect.options.length > 0) {
    subCategorySelect.remove(0);
  }

  // Add the default (placeholder) option cause the previous loop removed everything
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Subcategory";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  subCategorySelect.appendChild(defaultOption);

  // Then populate the select element with the new options
  options.forEach(item => {
    const option = document.createElement("option");
    option.value = item.categoryId;
    option.text = item.name;

    subCategorySelect.appendChild(option);
  });
}

function handleCategoryChange(e) {
  console.log("[onCategoryChange] Subcategory changed");
  const currentlySelectedOption = e.target.options[e.target.selectedIndex];
  const subCategories = currentlySelectedOption.dataset.subcategories;

  if (subCategories) {
    // If there are subcategories, we parse them to turn them into an array again
    // and call the populateSubcategorySelect function to populate the subcategories select.
    const subCategoriesArray = JSON.parse(subCategories);
    populateSubcategorySelect(subCategoriesArray);
  } else {
    populateSubcategorySelect([]);
  }
}

function handleSubcategoryChance(e) {
  console.log("[onSubcategoryChange] Subcategory changed");
  console.log(e);
  console.log(e.target.value);
  console.log(e.target.options[e.target.selectedIndex].text);
}

