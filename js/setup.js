'use strict';

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// убираем класс 'hidden' у блока .setup

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// находим элемент, в который будем добавлять другие элементы

var similarListElement = userDialog.querySelector('.setup-similar-list');

// находим шаблон и конкретный элемент, который нужно скопировать

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// показываем блок .setup-similar

userDialog.querySelector('.setup-similar').classList.remove('hidden');


// случайный выбор

var getRandomValue = function (arr) {
  var max = arr.length - 1;
  var rand = Math.random() * (max + 1);
  rand = Math.floor(rand);
  return rand;
};

// Массив

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: WIZARD_NAME[getRandomValue(WIZARD_NAME)] + ' ' + WIZARD_SURNAME[getRandomValue(WIZARD_SURNAME)],
      coatColor: COAT_COLOR[getRandomValue(COAT_COLOR)],
      eyesColor: EYES_COLOR[getRandomValue(EYES_COLOR)]
    };
  }
  return wizards;
};

// Копируем шаблон и заполняем данными

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Отрисовали блок .setup-similar-list и вставили элементы

var createWizards = function (wizards) {
  var fragment = document.createDocumentFragment(); // вставляем li в ul
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i])); // вставка каждого li в DocumentFragment
  }
  similarListElement.appendChild(fragment); // вместо фргамента вставляются элементы списка
};

createWizards(getWizards());


// Взаимодействия пользователя с сайтом //

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Находим элементы, с которыми будем работать

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

// Функция использования Esc

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция открытия Popup

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия Popup

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Обработчик клика на иконку = открытие Popup

var onButtonOpenClick = function () {
  openPopup();
};
setupOpen.addEventListener('click', onButtonOpenClick);

// Обработчик доступности = открытие Popup клавишей Enter

var onButtonOpenTab = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

setupOpen.addEventListener('keydown', onButtonOpenTab);

// Обработчик клика на крестик = закрытие Popup

var onButtonCloseClick = function () {
  closePopup();
};

setupClose.addEventListener('click', onButtonCloseClick);

// Обработчик доступности = закрытие Popup клавишей Enter

var onButtonCloseTab = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

setupClose.addEventListener('keydown', onButtonCloseTab);

// Изменение цвета глаз мага

var wizardSetup = document.querySelector('.setup-wizard');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var inputEyes = document.querySelector('input[name="eyes-color"]');

var changeWizardEyes = function () {
  var colorEyesNew = EYES_COLOR[getRandomValue(EYES_COLOR)];
  wizardEyes.style.fill = colorEyesNew;
  inputEyes.value = colorEyesNew;
};

var onWizardClick = function () {
  changeWizardEyes();
};
wizardSetup.addEventListener('click', onWizardClick);

var onWizardTab = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeWizardEyes();
  }
};
wizardSetup.addEventListener('keydown', onWizardTab);

// Изменение цвета фаербола мага

var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var fireballSetup = document.querySelector('.setup-fireball-wrap');
var inputFireball = fireballSetup.querySelector('input');

var changeFireballColor = function () {
  var colorFireballNew = FIREBALL_COLOR[getRandomValue(FIREBALL_COLOR)];
  fireballSetup.style.backgroundColor = colorFireballNew;
  inputFireball.value = colorFireballNew;
};

var onFireballClick = function () {
  changeFireballColor();
};
fireballSetup.addEventListener('click', onFireballClick);

var onFireballTab = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeFireballColor();
  }
};
fireballSetup.addEventListener('keydown', onFireballTab);

// Валидация формы

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
