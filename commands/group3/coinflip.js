const { Command } = require('discord.js-commando');
module.exports = class CoinFlipping extends Command {
    constructor(client) {
        super(client, {
            name: 'coin',
            aliases: ['coinflip','硬幣'],
            group: 'group3',
            memberName: 'coin',
            description: '擲硬幣',
            examples: ['-coin'],
            throttling: {
                usages: 3,
                duration: 10
            },
        });
    }
    run(msg) {
        var result = Math.random();
        if(result>=0.5){
            msg.reply('你擲到**正面**');
        }
        else{
            msg.reply('你擲到**反面**');
        }
    }
};