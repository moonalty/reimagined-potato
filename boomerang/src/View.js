// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track, score, posA, posB) {
    this.score = score;
    this.enemy = posA;
    this.boomerang = posB;
    // Тут всё рисуем.
    
    console.clear();
    for (let i = 0; i < track.length; i++) {
      console.log(track[i].join(''));
    }

    console.log('\n\n');
    console.log(`Ваш счет "${this.score}" `);
    // + "posA: " + this.enemy, "posB: " + this.boomerang
  }
}

module.exports = View;
