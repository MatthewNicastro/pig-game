'use strict';
const max_score = 10;
const btn_roll_dice = document.querySelector('.btn--roll');
const btn_hold_score = document.querySelector('.btn--hold');
const btn_new_game = document.querySelector('.btn--new');
const img_dice = document.querySelector('.dice');

const p1_section = document.querySelector('.player--0');
const p1_score = document.getElementById('score--0');
const p1_current = document.getElementById('current--0');
const p1 = {
  player_object: p1_section,
  player_score_object: p1_score,
  player_current_object: p1_current,
  player_score: 0,
  update_score() {
    this.player_score += current_score;
    this.player_score_object.textContent = this.player_score;
  }
}
const p2_section = document.querySelector('.player--1');
const p2_score = document.getElementById('score--1');
const p2_current = document.getElementById('current--1');
const p2 = {
  player_object: p2_section,
  player_score_object: p2_score,
  player_current_object: p2_current,
  player_score: 0,
  update_score (){
    this.player_score += current_score;
    this.player_score_object.textContent = this.player_score;
  }
}
const players = [p1, p2];

let active_player = 0;
let current_score = 0;
let playing = true;

function swap_active_player(){
  current_score = 0;
  players[active_player].player_current_object.textContent = current_score;
  for(let i = 0; i < players.length; i++)
    players[i].player_object.classList.toggle('player--active');
  active_player = (active_player + 1) % 2;
}

//Initial conditions
img_dice.classList.add('hidden');
for(let i = 0; i < players.length; i++){
  players[i].player_score_object.textContent = '0';
  players[i].player_current_object.textContent = '0';
}

btn_new_game.addEventListener('click', function (){
  players[active_player].player_object.classList.remove('player--winner');
  for(let i = 0; i < players.length; i++){
    players[i].player_score_object.textContent = '0';
    players[i].player_current_object.textContent = '0';
    players[i].player_score = 0;

  }
  img_dice.classList.add('hidden');
  playing = true;
  current_score = 0;
  active_player = 0;
  players[active_player].player_object.classList.add('player--active');
});

btn_roll_dice.addEventListener('click', function (){
  if(playing){
    const roll = Math.trunc(Math.random() * 6) + 1;
    if(img_dice.classList.contains('hidden')) img_dice.classList.remove('hidden');
    img_dice.src = `dice-${roll}.png`;
    current_score += roll;
    if(roll === 1) swap_active_player();
    else players[active_player].player_current_object.textContent = current_score;
  }
});

btn_hold_score.addEventListener('click', function (){
  if(playing){
    players[active_player].update_score(current_score);
    if(players[active_player].player_score >= max_score){
      players[active_player].player_object.classList.add('player--winner');
      players[active_player].player_object.classList.remove('player--active');
      img_dice.classList.add('hidden');
      playing = false;
    }
    else swap_active_player();
  }
});
