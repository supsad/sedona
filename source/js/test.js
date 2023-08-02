/* TODO
Сделать поддержку того, что если записано неправильное значение,
оно удаляется из localStorage (так как у меня нет проверок символьных,
то просто сделаю проверочную функцию из принципа проверок браузера):
* 1) Создать два массива: массив констант и массив пары ключ-значение
? 2) Сделать проверку на ошибку (она уже есть в виде подсветки строки)
? 3) Удалить/не запоминать пару ключ значение из localStorage, чтобы оно там не хранилось, после неправильно заполнения
* 4) Переписать под этот принцип через перебор поддержку localStorage
* 5) Для расширения посмотреть возможность сократить количество констант полей
*/

const userInfoInputs = document.querySelectorAll(".user-info__input");

// * Object with req inputs
let userReqValue = {};

// * localStorage support
let isLocalStorageSupport = true;

try {
  for (let input of userInfoInputs) {
    let tempAttr = input.getAttribute("name");
    if (input.hasAttribute("required")) {
      userReqValue[tempAttr] = true;
      localStorage.getItem(tempAttr);
    }
  }
} catch (err) {
  isLocalStorageSupport = false;
}

// TODO Функция удаления неправильного значения / сокращение полей

let regexEmail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
let regexTel = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");

const invalidReqFieldsChecker = function () {
  userInfoInputs.reverse().filter(element => {
    if (element.validity.valueMissing && element.validity.typeMismatch) {
      element.classList.add("user-info__input_invalid");
      element.focus();
      localStorage.removeItem(element.getAttribute("name"));
      return element;
    }
    element.classList.remove("user-info__input_invalid");
  });
}


// Прошлая версия (отменено)

// // * Array of selectors filled with user data
//
// let userInfoArr = [];
// let userInfoArrReq = [];
//
// // let localStorageKeys = {
// //   name: "required",
// //   surname: "required",=
// //   "middle-name": "not-required",
// //   tel: "required",
// //   email: "required"
// // };
//
// let localStorageKeysLength = Object.keys(localStorageKeys).length;
//
// // ? userInfoArr reversed
//
// getAllUserKeys();
//
// // * Getting all keys into an array
//
// const getAllUserKeys = function () {
//   for (let key in localStorageKeys) {
//     userInfoArr[localStorageKeysLength - 1] = document.querySelectorAll(`[name=user-${key}]`);
//     localStorageKeysLength--;
//   }
// };
//
// // * Checking only required fields
// // TODO 1. Просмотреть значения ключей
// // TODO 2. Создать новый массив на основе Arr, с удаленным ключом i
// const validReqUserField = function () {
//   for (let i = 0; i < localStorageKeysLength; i++) {
//     if (Object.keys(localStorageKeys[localStorageKeysLength - 1]) === "not-required") {
//
//     }
//   }
// };
//
// // * Required fields not met
//
// const userReqNoMet = function () {
//
// };
