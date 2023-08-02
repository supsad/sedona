"use strict";

const submitButton = document.querySelector(".form-review__button");
const closeButtons = document.querySelectorAll(".modal__button");
const modals = document.querySelectorAll(".modal");
const modalFailure = document.querySelector(".modal_failure");
const modalSuccess = document.querySelector(".modal_success");

const userNameBlock = document.querySelector(".form-review__item_user");
const userImpressBlock = document.querySelector(".form-review__item_impression");

// * Focus checker
let windowInnerWidth = document.documentElement.clientWidth;

if (windowInnerWidth >= 768) {
  userNameBlock.before(userImpressBlock);
}

submitButton.addEventListener("click", function (evt) {
  if (!formUserName.value || !formUserSurName.value || !formUserTel.value || !formUserEmail.value) {
    evt.preventDefault();

    // fix error shake anim
    submitButton.classList.remove("modal__button_error");
    submitButton.offsetWidth = submitButton.offsetWidth;
    submitButton.classList.add("modal__button_error");

    modalFailure.classList.remove("modal_close");
    modalFailure.classList.add("modal_show");

    modalOpenChecker();
    closeButtonHandler();
  } else {
    modalSuccess.classList.remove("modal_close");
    modalSuccess.classList.add("modal_show");

    modalOpenChecker();
    closeButtonHandler();

    if (isLocalStorageSupport) {
      // localStorage.setItem("user-name", formUserName.value);
      // localStorage.setItem("user-surname", formUserSurName.value);
      // localStorage.setItem("user-middle-name", formUserMiddleName.value);
      // localStorage.setItem("user-tel", formUserTel.value);
      // localStorage.setItem("user-email", formUserEmail.value);

      // for (let key = 0; key < localStorageKeysLength; key++) {
      //   // userInfoArr[key].reverse().value = localStorage.getItem(`user-${localStorageKeys[key]}`);
      //   localStorage.setItem(`user-${key}`, `${}`.value)
      // }
    }
  }
});

// * Modal checker & button checker
let modalCurrent;
let closeButtonCurrent;

function modalOpenChecker() {
  let modalIsOpened = (array, element) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      }
    }
    return false;
  }

  if (modalIsOpened(modals, modalSuccess)) {
    if (modalSuccess.classList.contains("modal_show")) {
      modalCurrent = modalSuccess;
      closeButtonCurrent = closeButtons[1];
    } else {
      modalCurrent = modalFailure;
      closeButtonCurrent = closeButtons[0];
    }
  }
}

// * Close/Close anim handler to block
function modalCloseHandler(item) {
  let closeModal = () => item.classList.remove("modal_show");
  let closeModalAnim = () => item.classList.remove("modal_close");

  item.classList.add("modal_close");
  setTimeout(closeModalAnim, 600);
  setTimeout(closeModal, 500);
}

// * Dynamic button closer
function closeButtonHandler() {
  closeButtonCurrent.focus();
  closeButtonCurrent.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalCloseHandler(modalCurrent);
    invalidRequiredFieldsChecker();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      if (modalCurrent.classList.contains('modal_show')) {
        evt.preventDefault();
        modalCloseHandler(modalCurrent);
        modalCurrent.classList.remove('modal_error');
      }
    }
  });
}
