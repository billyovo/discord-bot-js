const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class tictoe extends Command {
    constructor(client) {
        super(client, {
            name: 'tictoe',
            aliases: ['tt'],
            group: 'group3',
            memberName: 'game2',
            description: 'play',
            examples: ['-tictoe'],
            throttling: {
                usages: 1,
                duration: 30
            },
        });
    }
    run(msg) {
        var player = [msg.author.username];
        const symbols = [':one:',':two:',':three:',':four:',':five:',':six:',':seven:',':eight:',':nine:']
        var playerSymbol = [':o:',':x:'];
        var temp = Math.floor(Math.random() * 2);
        var x = temp%2;
        var i; 
        let board = [[':one:', ':two:', ':three:'],
                     [':four:', ':five:', ':six:'],
                     [':seven:', ':eight:', ':nine:']];
        var draw = false;
        var finish = false;
        var turnmessage;
        var message2;
        var message3;
        var forSend = '\r\n'+board[0][0]+board[0][1]+board[0][2]+'\r\n'+board[1][0]+board[1][1]+board[1][2]+'\r\n'+board[2][0]+board[2][1]+board[2][2];
        var embed = new Discord.RichEmbed()
        .setTitle(turnmessage+playerSymbol[x]+player[x]+'的回合\r\n')
        .setColor('FF3232')
        .setDescription(forSend);
    
                      function output(){
                        forSend = '\r\n'+board[0][0]+board[0][1]+board[0][2]+'\r\n\r\n'+board[1][0]+board[1][1]+board[1][2]+'\r\n\r\n'+board[2][0]+board[2][1]+board[2][2];
                          embed = new Discord.RichEmbed()
                         .setTitle(turnmessage+playerSymbol[x]+player[x]+'的回合\r\n')
                         .setColor('FF3232')
                         .setDescription(forSend);
                        if(message3!=undefined){
                        message3.edit(embed);
                        }
                        else{
                        msg.channel.send(embed)
                        .then((message)=>{
                            message3 = message;
                        })
                        }
                       
                      
                    }
        var Round = 0;
    function CheckWin(){
        var connect = 0;
        var i , j;
    if(board[0][0]==board[0][1]){
        if(board[0][2]==board[0][1]){
            finish = true;
        }
    }
    if(board[1][0]==board[1][1]){
        if(board[1][2]==board[1][1]){
            finish = true;
        }
    }
    if(board[2][0]==board[2][1]){
        if(board[2][2]==board[2][1]){
            finish = true;
        }
    }
    if(board[0][0]==board[1][0]){
        if(board[1][0]==board[2][0]){
            finish = true;
        }
    }
    if(board[0][1]==board[1][1]){
        if(board[1][1]==board[2][1]){
            finish = true;
        }
    }
    if(board[0][2]==board[1][2]){
        if(board[1][2]==board[2][2]){
            finish = true;
        }
    }
    if(board[0][0]==board[1][1]){
        if(board[1][1]==board[2][2]){
            finish = true;
        }
    }
    if(board[0][2]==board[1][1]){
        if(board[1][1]==board[2][0]){
            finish = true;
        }
    }
    Round++
    if(Round == 9&&finish!=true){
        finish = true;
        draw = true;
        turnmessage=':tada: 平手\r\n';
        output();

        
      
    }
    }

                      function WriteAnswer(num){
                        var i , j;
                        var found = false;
                        try{
                        for(i=0;i<3;i++){
                            for(j=0;j<3;j++){
                                if(board[i][j]== symbols[num-1]){
                                    board[i][j] = playerSymbol[x];
                                    found = true;
                                }
                            }
                        }
                    }
                    catch(error){
                        msg.channel.send('一個錯誤發生了請自行負責!下一位!');
                    }
                    if(!found){
                        Round--;
                    }
             }  


            function getAnswer(){
            var timeout = true;
            output();
            
            const filter2 = (message) => Number.isInteger(parseInt(message.content));
            let collector2 = msg.channel.createMessageCollector(filter2,{ time: 15000 });
            collector2.on('collect', (text, collector2) => {
    
                if(text.author.username==player[x]&&parseInt(text.content)>0&&parseInt(text.content)<10){
                
                    WriteAnswer(text.content);
                    text.delete();
                    CheckWin();
                    timeout=false;
                    collector2.stop();
                        }
            })
            collector2.on('end', (reaction, collector) => {
                if(!finish&&timeout==false){
                temp = temp + 1;
                x = temp % 2;
                getAnswer();
                }
                if(timeout==true){
                    turnmessage = '時間到!'+player[x]+'沒有行動所以輸了!\r\n';
                }
                if(finish&&timeout==false&&draw==false){
                   turnmessage = ':tada:**'+player[x]+'嬴了!**\r\n';
                   output();
                    
                }
            })  

        }



        var timeout2 = true;
        msg.channel.send(msg.author.username+'想跟你玩遊戲!請按下面的表情加入!')
        .then((message)=>{
        message.react('503113045162065920')
        .then(()=>{
        const filter = (reaction, user) => reaction.emoji.id == "503113045162065920";
    let collector = message.createReactionCollector(filter, { time: 15000 });
    collector.on('collect', (reaction, collector) => {
        var play = reaction.users.map(m=>m.username);
        if(play[1]!=undefined){
            timeout2 = false;
            player[1] = play[1];
            msg.channel.send(player[1]+'已經加入遊戲!');
            turnmessage = playerSymbol[0]+player[0]+' vs '+playerSymbol[1]+player[1]+'\r\n';   
            collector.stop();
        }
    });
    collector.on('end', (reaction, collector) => {
        message.clearReactions();
        if(timeout2==false){
        getAnswer();
        }
        
    })       
      })
    }) 
    

    }
    }