"use strict";

/*
? The code structure has been complicated.
? Of course, you can do without an internal object and work directly with the web storage API,
? but I wanted to do some additional work with objects and study them.
? P.S. This is teaching material, btw :)
 */

/*
! TODO Сделать поддержку того, что если записано неправильное значение,
! оно удаляется из localStorage (так как у меня нет проверок символьных,
! то просто сделаю проверочную функцию из принципа проверок браузера):
* 1) Создать два массива: массив констант и *объект* пары ключ-значение
? 2) Сделать проверку на ошибку (она уже есть в виде подсветки строки)
? 3) Удалить/не запоминать пару ключ значение из localStorage, чтобы оно там не хранилось, после неправильно заполнения
? 3.1) Это мы делаем с помощью объекта. Работа идет с ним, после чего данные заполняются в localStorage
* 4) Переписать под этот принцип через перебор поддержку localStorage
* 5) Для расширения посмотреть возможность сократить количество констант полей
? 6) Если для функции есть regExp - заносить в объект и проверять в цикле
? 7) Добавить для всего отдельные функции, чтобы их можно было использовать отдельно
* 8) Добавить RegExp для email и tel полей
* 8.1) Только для email, т.к. с tel справляется встроенная в браузер проверка (считается плохой практикой?)
* 9) Объект сделать общим, обращение через this, сделать двухслойный объект
? 10) Внедрить в код оператор нулевого слияния
! 11) Найти применение внутреннему объекту (использовать Web Storage API - это и есть localStorage),
! вероятно, внутренний объект должен использоваться для того, чтобы вовремя проверять заполнение,
! а позже записывать все данные в localStorage, после чего объект стирается
! 11.1) Сначала идет работа только с внутренним объектом, после чего из него все данные записываются в localStorage
! и объект удаляется
? 12) Возможно, требуется переработка объекта в более лаконичный вид с подвидами, так как сейчас он больше похож
? на сборную солянку всего, т.е. разделить input с сайта и данные пользователя по разным подобъектам
*/

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

// ! Нужна ли эта функция?
function isRequiredInput(input) {
  return input.hasAttribute( "required" );
}

// ! Нужна ли эта функция?
function keyObject(obj) {
  for (let key of obj) {
    // userInfoArr[localStorageKeysLength - 1] = document.querySelectorAll(`[name=user-${key}]`);
    // localStorageKeysLength--;
  }

  return key;
}

function requiredInputsChecker() {
  this[name][key]
}

function validateInputs(inputs) {
  inputs.forEach(element => {


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

  return element;
}
