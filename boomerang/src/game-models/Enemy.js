// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = [69, this.generateRand()];
  }

  generateRand() {
    const num = Math.floor(Math.random() * 6);
    return num;
  }

  generateSkin() {
    const skins = ['👾', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    setInterval(() => {
      if (this.position[0] > 1) {
        this.position[0] -= 1;
      }
    }, 55);
  }

  // moveLeft()
  die() {
      // this.generateSkin();
      // this.position = [69, this.generateRand()];
      this.skin = '💀';
      console.log('Enemy is dead!');
    }
}

module.exports = Enemy;
