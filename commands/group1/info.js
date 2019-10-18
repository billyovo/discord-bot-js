const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class info extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: ['info'],
            group: 'group1',
            memberName: 'info',
            description: '各種資訊',
            examples: ['-info'],
        });
    }
    run(msg) {
        const embed = new Discord.RichEmbed()
        .setTitle("群組資訊")
        .setColor('51FF0D')
        .setImage(msg.guild.iconURL)
        .setThumbnail(msg.author.avatarURL)
        .setTimestamp()
        .setURL(msg.guild.iconURL)
        .addField("群組名稱",msg.guild.name)
        .addField("創建時間", msg.guild.createdAt.toLocaleString())
        .addField("你的加入時間", msg.member.joinedAt.toLocaleString())
        .addField("你加入discord的時間", msg.author.createdAt.toLocaleString())
        .addField("群組人數", msg.guild.memberCount)
        .setFooter("可愛的魔法少女", this.client.user.avatarURL)
        .addBlankField(true);
       
        msg.channel.send({embed});






     
    }
}

