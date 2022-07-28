const submitButton = document.querySelector(".form-review__button");
const closeButtons = document.querySelectorAll(".modal__button");
const modals = document.querySelectorAll(".modal");
const modalFailure = document.querySelector(".modal_failure");
const modalSuccess = document.querySelector(".modal_success");

const modalUserName = document.querySelector("[name=user-name]");
const modalUserSurName = document.querySelector("[name=user-surname]");
const modalUserMiddleName = document.querySelector("[name=user-middle-name]");
const modalUserTel = document.querySelector("[name=user-tel]");
const modalUserEmail = document.querySelector("[name=user-email]");

const userInfoBlock = document.querySelector(".form-review__item_user");
const userDataBlock = document.querySelector(".form-review__item_contacts");
const userImpressBlock = document.querySelector(".form-review__item_impression");

// localStorage support

let isModalStorageSupport = true;

try {
  modalUserName.value = localStorage.getItem("user-name");
  modalUserSurName.value = localStorage.getItem("user-surname");
  modalUserMiddleName.value = localStorage.getItem("user-middle-name");
  modalUserTel.value = localStorage.getItem("user-tel");
  modalUserEmail.value = localStorage.getItem("user-email");
} catch (err) {
  isModalStorageSupport = false;
}

// Focus checker

let windowInnerWidth = document.documentElement.clientWidth;

if (windowInnerWidth >= 768) {
  userInfoBlock.before(userImpressBlock);
}

// Close/Close anim handler to block

const modalCloseHandler = function (item) {
  let closeModal = () => item.classList.remove("modal_show");
  let closeModalAnim = () => item.classList.remove("modal_close");

  item.classList.add("modal_close");
  setTimeout(closeModalAnim, 600);
  setTimeout(closeModal, 500);
}

// Modal checker & button checker

let modalCurrent;
let closeButtonCurrent;

const modalOpenChecker = function () {
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

// Dynamic button closer

const closeButtonHandler = () => {
  closeButtonCurrent.focus();
  closeButtonCurrent.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalCloseHandler(modalCurrent);
    userNonFilterReqChecker();
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

// If a user has not filled in the inputs, then the checker highlights them in red

let userReqInputs = [modalUserName, modalUserSurName, modalUserTel, modalUserEmail];

const userNonFilterReqChecker = function () {
  userReqInputs.reverse().filter(element => {
    if (element.value === "") {
      element.classList.add("user-info__input_required");
      element.focus();
      return element;
    }
    element.classList.remove("user-info__input_required");
  });
}

submitButton.addEventListener("click", function (evt) {
  if (!modalUserName.value || !modalUserSurName.value || !modalUserTel.value || !modalUserEmail.value) {
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
    if (isModalStorageSupport) {
      localStorage.setItem("user-name", modalUserName.value);
      localStorage.setItem("user-surname", modalUserSurName.value);
      localStorage.setItem("user-middle-name", modalUserMiddleName.value);
      localStorage.setItem("user-tel", modalUserTel.value);
      localStorage.setItem("user-email", modalUserEmail.value);
    }
  }
});
