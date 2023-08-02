/* TODO
* Сделать поддержку того, что если записано неправильное значение,
* оно удаляется из localStorage (так как у меня нет проверок символьных,
* то просто сделаю проверочную функцию из принципа проверок браузера):
* !DONE! 1) Создать два массива: массив констант и массив пары ключ-значение !DONE!
* TODO 2) Сделать проверку на ошибку (она уже есть в виде подсветки строки)
* TODO 3) Удалить пару ключ значение из localStorage, чтобы оно там не хранилось, после неправильно заполнения
* !DONE! 4) Переписать под этот принцип через перебор поддержку localStorage
* !DONE! 5) Для расширения посмотреть возможность сократить количество констант полей */

// * Array of selectors filled with user data

let userInfoArr = [];
let userInfoArrReq = [];

const localStorageKeys = {
  name: "required",
  surname: "required",
  "middle-name": "not-required",
  tel: "required",
  email: "required"
};

let localStorageKeysLength = Object.keys(localStorageKeys).length;

// ? userInfoArr reversed

userLocalStorageHandler("get-all-keys");

// * localStorage support

let isModalStorageSupport = true;

try {
  for (let key = 0; key < localStorageKeysLength; key++) {
    userInfoArr[key].reverse().value = localStorage.getItem(`user-${localStorageKeys[key]}`);
  }
} catch (err) {
  isModalStorageSupport = false;
}

const userLocalStorageHandler = function (param) {
  switch (param) {
    // * Getting all keys into an array
    case "get-all-keys":
      for (let key in localStorageKeys) {
        userInfoArr[localStorageKeysLength - 1] = document.querySelectorAll(`[name=user-${key}]`);
        localStorageKeysLength--;
      }

      break;

    // * Checking only required fields
    case "valid-req-fields":
      // TODO 1. Просмотреть значения ключей
      // TODO 2. Создать новый массив на основе Arr, с удаленным ключом i
      for (let i = 0; i < localStorageKeysLength; i++) {
        if (localStorageKeys[localStorageKeysLength - 1] === "not-required") {

        }
      }

      break;

    // * Required fields not met
    case "req-no-met":

      break;
  }
}

// If a user has not filled in the inputs, then the checker highlights them in red

const userNotFillReqFieldsChecker = function () {
  userInfoArr.filter(element => {
    if (element.value === "") {
      element.classList.add("user-info__input_required");
      element.focus();
      return element;
    }
    element.classList.remove("user-info__input_required");
  });
}
