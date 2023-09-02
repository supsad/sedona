"use strict";

/* TODO Сделать поддержку того, что если записано неправильное значение,
оно удаляется из localStorage (так как у меня нет проверок символьных,
то просто сделаю проверочную функцию из принципа проверок браузера):
* 1) Создать два массива: массив констант и массив пары ключ-значение
? 2) Сделать проверку на ошибку (она уже есть в виде подсветки строки)
? 3) Удалить/не запоминать пару ключ значение из localStorage, чтобы оно там не хранилось, после неправильно заполнения
* 4) Переписать под этот принцип через перебор поддержку localStorage
* 5) Для расширения посмотреть возможность сократить количество констант полей
* 6) Если для функции есть regExp - заносить в объект и проверять в цикле
? 7) Добавить для всего отдельные функции, чтобы их можно было использовать отдельно
? 8) Сделать общий чекер (что это вообще за чекер?)
? 9) Объект сделать общим, обращение через this, сделать двухслойный объект
? 10) Внедрить в код оператор нулевого слияния
? 11) Объект сделать общим, обращение через this, сделать двухслойный объект */

const userInfoInputs = document.querySelectorAll(".user-info__input");

// * Object with req inputs
let user = {}

// * localStorage support
let isLocalStorageSupport = true;

try {
  makeUser();
  console.log( "Local storage support: " + true );
} catch (err) {
  isLocalStorageSupport = false;
  console.log( "Local storage support: " + isLocalStorageSupport );
}

function makeUser(name, surname, middleName, email, tel) {
  fillUserInputs(userInfoInputs);
  return user = {
    name,
    surname,
    middleName,
    email,
    tel,
  }
}

function fillUserInputs(inputs) {
  for (let input of inputs) {
    let inputNameAttribute = input.getAttribute("name");

    fillUserInputsTag( input, inputNameAttribute );
    fillUserRequiredInputs( input, inputNameAttribute );
    localStorage.getItem( inputNameAttribute );
  }

  return inputs; // TODO ???
}

// TODO не работает

function fillUserInputsTag(userInputField, attributeName) {
  return this[attributeName] = {
    "input": userInputField,
  }
}

function fillUserRequiredInputs(userInputField, attributeName) {
  if (isRequiredInput( userInputField )) {
    return this[attributeName] = {
      "required": true,
    }
  } else {
    return this[attributeName] = {
      "required": false,
    }
  }
}

function isRequiredInput(input) {
  return input.hasAttribute( "required" );
}

function invalidRequiredFieldsChecker() {
  // if (element.getAttribute("name") === "user-email" && validateEmail(element)) {
  //
  // }

  userInfoInputs.forEach(element => {


    if (element.validity.valueMissing && element.validity.typeMismatch) {
      localStorage.removeItem( element.getAttribute("name") );

      invalidFocus( element );
    }
    element.classList.remove( "user-info__input_invalid" );
  });
}

// TODO Функция удаления неправильного значения / сокращение полей
/* * There was an idea to add a regular expression, including for the phone,
* but other developers advise not to do this,
* but to use a third-party library. Since this is a small project,
* I decided to leave phone validation to the browser
*/

function validateEmail(element) {
  const REGEX_EMAIL = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  return REGEX_EMAIL.test( element.value );
}

const invalidFocus = (element) => {
  element.classList.add( "user-info__input_invalid" );
  element.focus();

  return element
}
