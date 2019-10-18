const { Command } = require('discord.js-commando');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'online',
            aliases: ['on'],
            group: 'group1',
            memberName: 'reply',
            description: '看看我是否在線.',
            examples: ['reply']
        });
    }
    run(msg) {
        return msg.channel.send('嗨各位我在喔');
       
    }
};

