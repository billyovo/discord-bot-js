const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class UserPic extends Command {
    constructor(client) {
        super(client, {
            name: 'icon',
            aliases: ['avatar'],
            group: 'group1',
            memberName: 'avatar',
            description: '看看別人超醜的頭像',
            examples: ['-icon @mention'],
        });
    }
    run(msg) {
        var url,nam;
       // msg.channel.send('各位這是'+msg.author.username+'的超美頭像\n '+msg.author.avatarURL);
      var user = msg.mentions.users.first();
      if(user == undefined){
        url = msg.guild.iconURL;
        nam = msg.guild.name;
    }
    else{
        url = user.avatarURL;
        nam = user.username;
    }

    const embed = new Discord.RichEmbed()
      .setTitle(nam+'的超美頭像')
      .setURL(url)
      .setImage(url)
      .setColor('51FF0D');
      msg.channel.send({embed});
      
    }


};
//user.avatarURL
//<@395454424954437632>