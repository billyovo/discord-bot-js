const { Command } = require('discord.js-commando');
const request = require('request');
const Discord = require('discord.js');
module.exports = class hangman extends Command {
    constructor(client) {
        super(client, {
            name: 'hangman',
            aliases: ['hm','h'],
            group: 'group3',
            memberName: 'hangman',
            description: 'hangman',
            examples: ['-hangman'],
            args: [
                {
                    key: 'text1',
                    prompt: '',
                    type: 'string',
                    default : 'Random',
                  
                } 
                //,
               // { repeat in case of second arg
               //
               // }
            ]
        });    
    }
//              ,arg below
    run(msg, { text1 }) {
        var player = msg.author.username;
        var last = '';
        var ans;
        var fail = 0;
        var answer;
        var display;
        var used =[];
        var message;
        var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'
                        ,'o','p','q','r','s','t','u','v','w','x','y','z'];
        var colour = ['32CD32','ff0000'];

        const type = ['animals','things','fruits'];
        var embed;
        function getRequest(){
        var promise1 = new Promise(function(resolve, reject) {
        if(text1=='Random'||!type.includes(text1)){
            text1 = type[Math.floor(Math.random() * type.length)];
        }

        request.get('https://www.randomlists.com/data/'+text1+'.json', {
        }, function(error, response, body) {
            body = JSON.parse(body);
            var temp2 = body.RandL.items[Math.floor(Math.random() * body.RandL.items.length)];
            answer = body.RandL.items[Math.floor(Math.random() * body.RandL.items.length)];
            answer = answer.replace(' ','　');
            display = answer.replace(/[a-z]/gi,'◯');
            display = display.split('');
            answer = answer.split('');
         embed =    new Discord.RichEmbed()
                    .setTitle(msg.author.username+"'s hangman game!\r\nCategory: "+text1)
                    .setColor('36393E')
                    .setDescription(display.join('  ')+'\r\n\r\nYour last guess: '+last+'\r\nFail count :'+fail+'/6\r\n\r\nUsed : '+used.join(' , '));
            resolve();
        })
    
    })
    promise1.then(()=>{
        msg.channel.send({embed})
        .then((message2)=>{
            message = message2;
        })
        getAnswer();
    })
}
    

        function getAnswer(){
            var correct = false;
            var i;
            const filter2 = (message) => message.author.username==player&&!used.includes(message.content.toLowerCase());
            let collector2 = msg.channel.createMessageCollector(filter2,{ time: 300000 });
            collector2.on('collect', (text, collector2) => {
                if(text.content.length == 1 && text.content.toLowerCase().match(/[a-z]/i)){
                text.delete();
                var a = text.content.toLowerCase();
               ans = last = a;
            if(answer.includes(ans)){
                correct = true;
                for(i=0;i<answer.length;i++){
                    if(answer[i].toLowerCase()==ans){
                        display[i] = answer[i];
                    }
                
         
            }
        }
        else{
            
                fail++
                used.push(ans)
                used = used.sort();
            
        }
    }
    else{
        if(text.content==answer.join('').replace('　',' ')){
            display = text.content.split('');
            correct = true;
        }
    }
           embed = new Discord.RichEmbed()
           .setTitle(msg.author.username+"'s hangman game!\r\nCategory: "+text1)
            .setColor('36393E')
            .setDescription(display.join('  ')+'\r\n\r\nYour last guess: '+last+'\r\nFail count :'+fail+'/6\r\n\r\nUsed : '+used.join(' , '));
              if(correct){
                embed.setColor(colour[0]);
              }
              else{
                  embed.setColor(colour[1]);
              }
            message.edit({embed});
                collector2.stop();
                if(fail==6){
                    answer = answer.join('').replace('　',' ').split('');
                    const embed = new Discord.RichEmbed()
                    .setTitle('You lose! The word is :')
                    .setColor('ff0000')
                    .setDescription('['+answer.join('')+'](https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg)')
                 //   .setURL('https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg')
                    .setImage('https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg');
                  //  console.log('https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg');
                    message.channel.send({embed});
                    collector2.stop();
                  
                    
                    //https://www.randomlists.com/img/animals/soy_sauce_packet.jpg
                }
                if(!CheckWin()&&fail!=6){
                    getAnswer();
                }
                if(CheckWin()){
                    answer = answer.join('').replace('　',' ').split('');
                    const embed = new Discord.RichEmbed()
                    .setTitle('You win! The word is :')
                    .setColor('228B22')
                    .setDescription('['+answer.join('')+'](https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg)')
                    //.setURL('https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg')
                    .setImage('https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg');
                   // console.log('https://www.randomlists.com/img/'+text1+'/'+answer.join('').replace(' ','_')+'.jpg');
                    message.channel.send({embed});
                }

            
                
            })
        }
       
     
        function CheckWin(){
            if(answer.join('') != display.join('')){
                return false;
            }
            else{
                return true;
            }
        }
        getRequest();


    }
}

/*
 const filter2 = (message) => Number.isInteger(parseInt(message.content));
            let collector2 = msg.channel.createMessageCollector(filter2,{ time: 30000 });
            collector2.on('collect', (text, collector2) => {
                if(text.author.username==player[x]&&parseInt(text)>0&&parseInt(text)<8&&text.content.length==1){
                    if(toplayer[parseInt(text)-1]>=0){
                    WriteAnswer(parseInt(text.content));
                    text.delete();
                    CheckWin();
                    timeout=false;
                    collector2.stop();
                    }
                        }
            })
            */