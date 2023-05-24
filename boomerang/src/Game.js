// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const keypress = require('../node_modules/keypress');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero([0, 0], [0, 0]); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.boomerang = new Boomerang();
    this.track = [];
    this.regenerateTrack();
    this.score = 0;
  }

  controller() {
    const keyboard = {
      d: (() => {
        // eslint-disable-next-line max-len
        if (this.hero.position[0] === this.boomerang.position[0] && this.boomerang.position[1] === this.hero.position[1]) {
          this.boomerang.moveRight();
        }
        this.hero.moveRight();
      }),
      a: (() => {
        if (this.hero.position[0] === this.boomerang.position[0] && this.boomerang.position[1] === this.hero.position[1]) {
          this.boomerang.moveLeft();
        }
        this.hero.moveLeft();
      }),
      w: (() => {
        if (this.hero.position[0] === this.boomerang.position[0] && this.boomerang.position[1] === this.hero.position[1]) {
          this.boomerang.moveUp();
        }
        this.hero.moveUp();
      }),
      s: (() => {
        if (this.hero.position[0] === this.boomerang.position[0] && this.boomerang.position[1] === this.hero.position[1]) {
          this.boomerang.moveDown();
        }
        this.hero.moveDown();
      }),
      c: (() => {
        let rigthCounter = 0;
        let LeftCounter = 20;
          if (this.hero.position[1] !== this.boomerang.position[1] && this.hero.position[0] !== this.boomerang.position[0]) return;

        const timerId = setInterval(() => {
          this.boomerang.moveRight();
          rigthCounter+= 1;

          if (rigthCounter === 20 || this.boomerang.position[1] === 69) {
            const TimerId2 = setInterval(() => {
              this.boomerang.moveLeft();
              LeftCounter-= 1;

              if(LeftCounter === 0 ||
                this.hero.position[1] === this.boomerang.position[1] ||
                this.hero.position[1] === this.boomerang.position[1] + 1 ||
                this.hero.position[1] === this.boomerang.position[1] - 1) {
                  clearTimeout(TimerId2)
                }
            }, 90);
            clearTimeout(timerId)
          }
        }, 90)
      }),
    };
    function runInteractiveConsole() {
      keypress(process.stdin);
      process.stdin.on('keypress', (ch, key) => {
        if (key) {
          // Вызывает команду, соответствующую нажатой кнопке.
          if (key.name in keyboard) {
            keyboard[key.name]();
          }
          // Прерывание программы.
          if (key.ctrl && key.name === 'c') {
            process.exit();
          }
        }
      });
      process.stdin.setRawMode(true);
    }
    runInteractiveConsole();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = [(new Array(this.trackLength)).fill(' '),
    (new Array(this.trackLength)).fill(' '),
    (new Array(this.trackLength)).fill(' '),
    (new Array(this.trackLength)).fill(' '),
    (new Array(this.trackLength)).fill(' '),
    (new Array(this.trackLength)).fill(' '),
    (new Array(this.trackLength)).fill(' ')];

    this.track[this.boomerang.position[0]][this.boomerang.position[1]] = this.boomerang.skin;
    this.track[this.hero.position[0]][this.hero.position[1]] = this.hero.skin;
    this.track[this.enemy.position[1]][this.enemy.position[0]] = this.enemy.skin;
  }

  check() {
    //поднять бумеранг
    if ((this.boomerang.position[0] === this.hero.position[0] && this.boomerang.position[1] === this.hero.position[1])
      || (this.boomerang.position[0] === this.hero.position[0] && this.boomerang.position[1] === this.hero.position[1] + 1)
      || (this.boomerang.position[0] === this.hero.position[0] && this.boomerang.position[1] === this.hero.position[1] - 1)) {
      this.boomerang.position[0] = this.hero.position[0];
      this.boomerang.position[1] = this.hero.position[1];
    }
    // смерть игрока
    if (this.hero.position[1] === this.enemy.position[0] && this.hero.position[0] === this.enemy.position[1]) {
      
      this.hero.die();
    }
    // if (this.enemy.position[0] === 1){
    //   this.enemy.die();
    // }


    // респавн противника
    if (this.enemy.position[0] === 1){
    this.enemy.die();
    this.score += 50;
    this.enemy = new Enemy();
    this.enemy.moveLeft();
    }

    // убить противника ???
    if (((this.boomerang.position[0] === this.enemy.position[1] && this.boomerang.position[1] === this.enemy.position[0])
    // || (this.boomerang.position[0] === this.enemy.position[1] && this.boomerang.position[1] === this.enemy.position[0] + 1)
    // || (this.boomerang.position[0] === this.enemy.position[1] && this.boomerang.position[1] === this.enemy.position[0] - 1)
    )
    ){
        this.enemy.die();
        this.score += 100;
        this.enemy = new Enemy();
        this.enemy.moveLeft();
    }
  }

  play() {
    this.controller();
    this.enemy.moveLeft();
    setInterval(() => {
      // Let's play!

      this.check();
      this.regenerateTrack();
      this.view.render(this.track, this.score, this.enemy.position, this.boomerang.position);
    }, 10);
  }
}

// const pole = new Game(30)
// console.log(pole.regenerateTrack())

module.exports = Game;
