const { Command } = require('klasa');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      cooldown: 10,
      description: 'Look at this photograph, DAMNIT!',
      usage: '<user:member>',
    });
  }

  async run(msg, [user]) {
    const image = user.user.displayAvatarURL({ format: 'png', size: 512 });
    try {
      const base = await loadImage(
        path.join(
          __dirname,
          '..',
          '..',
          'images',
          'look-at-this-photograph.png'
        )
      );
      const avatar = await loadImage(image);
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(base, 0, 0);
      ctx.rotate(-13.5 * (Math.PI / 180));
      ctx.drawImage(avatar, 280, 218, 175, 125);
      ctx.rotate(13.5 * (Math.PI / 180));
      return msg.send({
        files: [
          {
            attachment: canvas.toBuffer(),
            name: 'look-at-this-photograph.png',
          },
        ],
      });
    } catch (err) {
      return msg.reply(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  }
};
