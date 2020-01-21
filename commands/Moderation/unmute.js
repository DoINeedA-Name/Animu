const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 6,
      requiredPermissions: ['MANAGE_ROLES'],
      runIn: ['text'],
      description: 'Unmutes a mentioned user.',
      usage: '<member:member> [reason:...string]',
      usageDelim: ' ',
    });
  }

  async run(msg, [member, reason]) {
    if (member.roles.highest.position >= msg.member.roles.highest.position)
      throw 'You cannot unmute this user.';
    if (!member.roles.has(msg.guild.settings.mutedRole))
      throw 'This user is not muted.';

    await member.roles.remove(msg.guild.settings.mutedRole);

    return msg.sendMessage(
      `${member.user.tag} was unmuted.${
        reason ? ` With reason of: ${reason}` : ''
      }`
    );
  }
***REMOVED***
