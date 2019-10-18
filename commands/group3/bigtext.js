const { Command } = require('discord.js-commando');
 // for fetching the feed
module.exports = class bigtext extends Command {
    constructor(client) {
        super(client, {
            name: 'bigtext',
            group: 'group6',
            memberName: 'bigtext',
            description: 'bigtext',
            examples: ['bigtext'],
            args: [
                {
                    key: 'text',
                    type: 'string',
                    prompt:'wrong!',
                    default : '',
                }]
   
        });    
    }
//              ,arg below
    run(msg,{text}) {
    const list = ['zero','one','two','three','four','five','six','seven','eight','nine'];
      if(text==''){
        return;      
    }
    
    var i;
    var result = '';
function calculate(callback){ 
    for(i=0;i<text.length;i++){
   
        if(Number.isInteger(parseInt(text[i]))){
            result = result + ':'+list[parseInt(text[i])]+':';
        }
        else{
            if(text[i]!=' '){
                if(text[i].toLowerCase()!=text[i].toUpperCase()){
                result = result + ':'+'regional_indicator_'+text[i].toLowerCase() + ':';
                }
            }
            else{
                result = result + ' ';
            }
        }
    }
    return callback();
}

    function send(){
        msg.channel.send(result);
    }

    calculate(send);
}
}