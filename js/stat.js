'use strict';


var BAR_WIDTH = 40;
var BAR_MAXHEIGHT = 150;
var BAR_X = 145;
var BAR_Y = 80;
var GAP = 50;
var TEXT_GAP = 10;


var renderCloud = function (ctx, color, diff) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(187 + diff, 97 + diff, 88, 1.785 * Math.PI, 0.68 * Math.PI, true);
  ctx.arc(218 + diff, 197 + diff, 83, 1.1 * Math.PI, 0.25 * Math.PI, true);
  ctx.arc(343 + diff, 175 + diff, 104, 0.72 * Math.PI, 0.25 * Math.PI, true);
  ctx.arc(407 + diff, 134 + diff, 115, 0.45 * Math.PI, 1.35 * Math.PI, true);
  ctx.arc(308 + diff, 71 + diff, 60, 1.7 * Math.PI, 1.16 * Math.PI, true);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};


var getMaxElement = function (arr) {
  if (arr.length === 0) {
    return Infinity;
  }

  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColor = function (players) {
  if (players === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    return 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.3) + 0.3) + ')';
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', 10);
  renderCloud(ctx, '#fff', 0);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {

    var barHeight = BAR_MAXHEIGHT * times[i] / maxTime;
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, вы победили!', BAR_X - TEXT_GAP * 2, TEXT_GAP * 4);
    ctx.fillText('Список результатов:', BAR_X - TEXT_GAP * 2, TEXT_GAP * 5.5);
    ctx.fillText(players[i], BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y + BAR_MAXHEIGHT + TEXT_GAP * 1.3);
    ctx.fillText(Math.round(times[i]), BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y + (BAR_MAXHEIGHT - barHeight) - TEXT_GAP / 2);
    ctx.fillStyle = getColor(players [i]);
    ctx.fillRect(BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y + (BAR_MAXHEIGHT - barHeight), BAR_WIDTH, barHeight);
  }
};

