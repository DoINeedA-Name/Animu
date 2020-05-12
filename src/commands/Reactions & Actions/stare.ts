import { Command, CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import _ from 'lodash';

export default class extends Command {
  constructor(store: CommandStore, file: string[], dir: string) {
    super(store, file, dir, {
      runIn: ['text'],
      requiredPermissions: ['EMBED_LINKS'],
      cooldown: 2,
      description: 'STARE',
    });
  }

  async run(msg: KlasaMessage) {
    return msg.sendEmbed(
      new MessageEmbed()
        .setTitle(`${msg.member.displayName} stares at ${member}`)
        .setImage(_.sample(gifs))
        .setColor('#2196f3')
    );
  }
}

// Gifs
const gifs = [
  'https://cdn.discordapp.com/attachments/587691022826602516/709580673056374854/Stare4.gif',
  'https://cdn.discordapp.com/attachments/587691022826602516/709580667960295514/anime-stare-gif-2.gif',
  'https://cdn.discordapp.com/attachments/587691022826602516/709580655935094874/Stare.gif',
  'https://cdn.discordapp.com/attachments/587691022826602516/709580651229085741/Stare5.gif',
  'https://cdn.discordapp.com/attachments/587691022826602516/709580631457267754/Stare2.gif',

];
