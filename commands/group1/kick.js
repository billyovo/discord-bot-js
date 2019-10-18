const { Command } = require('discord.js-commando');
module.exports = class kick extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'group1',
            memberName: 'kick',
            description: '踢',
            examples: ['-kick @someone'],
            args: [
                {
                    key: 'text',
                    prompt: '為何你要踢這位朋友呢?',
                    type: 'string',
                } 
            ]
        });
    }
    run(msg,{ text }) {
       // msg.channel.send('各位這是'+msg.author.username+'的超美頭像\n '+msg.author.avatarURL);
      var user = msg.mentions.users.first();;
      if(user==undefined){
        msg.channel.send('你要在後面用@提及一位智障喔');
    }
    else{
        if(msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')){
      msg.guild.member(user).kick(text);
      msg.channel.send('因為'+text+', '+user.username+'已經被'+msg.author.username+'踢出外太空');
    }
    else{
        msg.channel.send(msg.author.username+ '小屁孩嘗試踢掉 '+user.id);
    }
}
    }
};
