const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var giphy = require('giphy-api')('m8rvGloPsBs807c7wwSg7Uk8gRHnzX1T');
module.exports = class gif extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            group: 'group19',
            memberName: 'gif',
            description: 'gif',
            examples: ['-gif be like bill'],
            args: [
                {
                    key: 'find',
                    prompt: 'find',
                    type: 'string',
                    default : '404 not found'
                } 
               
            ]
        });
    }
    run(msg,{find}) {
        giphy.search({q:find,limit :'2',fmt:'json'})
        .then(function (res) {

            msg.delete();
            msg.channel.send(res.data[0].url);
        })
        .catch(function(err){
            console.log(err);
        })
        
    }
}