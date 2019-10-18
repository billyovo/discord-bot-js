const { Command } = require('discord.js-commando');
module.exports = class subkey extends Command {
    constructor(client) {
        super(client, {
            name: 'sub',
            aliases: [],
            group: 'group13',
            memberName: 'subkey',
            description: 'subscribe to key',
            examples: ['-sub'],
         
        });    
    }
//              ,arg below
    run(msg) {
msg.delete();
var role = msg.guild.roles.find('id', '500999786380525577');
if(msg.channel.id!=='500993117852532737'){
    msg.author.send('請在秘鑰訂閱頻道上使用此功能!');
    return;
}

if(msg.member.roles.has('500999786380525577')){
    msg.member.removeRole(role).catch(console.error);
    msg.author.send('你已經取消秘鑰的訂閱了!');
}
else{
    msg.member.addRole(role);
    msg.author.send('你已經訂閱秘鑰了!');
    console.log(msg.author.username+' has subscribed');
}
}
}