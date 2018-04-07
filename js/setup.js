'use strict';

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55', 'rgb(0, 0, 0)'];
var EYES_CLOR = ['black', 'red', 'blue', 'yellow', 'green'];

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
      eyesColor: EYES_CLOR[getRandomValue(EYES_CLOR)]
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

