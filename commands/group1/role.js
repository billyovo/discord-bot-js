const { Command } = require('discord.js-commando');
module.exports = class role extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            aliases: [],
            group: 'group1',
            memberName: 'role',
            description: 'give you a role',
            examples: ['-role give'],
         
        });    
    }
//              ,arg below
    run(msg) {


msg.delete();


if(msg.channel.id!=='468262056999649301'){
    msg.author.send('請在老司機入口頻道上使用此功能!');
    return;
}


    msg.member.addRole(msg.member.guild.roles.find(role => role.name === '老司機'));
    msg.author.send('已經給予了你老司機頻道的權限了!');
    console.log(msg.author.username+' has been given the role');
}
}