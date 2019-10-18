const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class tictoe extends Command {
    constructor(client) {
        super(client, {
            name: 'connect4w',
            aliases: ['connectw','cw'],
            group: 'group3',
            memberName: 'game3',
            description: 'play3',
            examples: ['-connect'],
            throttling: {
                usages: 1,
                duration: 60
            },
        });
    }
    run(msg) {
        var player = [msg.author.username];
        const playerSymbol = [':large_blue_circle:',':red_circle:'];
        var temp = Math.floor(Math.random() * 2);
        var x = temp%2;
        var i;
        let board = [[':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:'],
                     [':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:'],
                     [':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:'],
                     [':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:'],
                     [':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:'],
                     [':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:'],
                     [':black_circle:', ':black_circle:', ':black_circle:',':black_circle:',':black_circle:',':black_circle:',':black_circle:']]
        var draw = false;
        var finish = false;
        var toplayer =[5,5,5,5,5,5,5];
        var message2;
        var boardmessage;
        var names;
        var globalplace;
        var colour =['00FFFF','FF3232'];
        var embed = new Discord.RichEmbed()
        .setTitle(names+'\r\n'+turnmessage )
        .setColor(colour[x])
        .setDescription(forSend);
        var turnmessage;
     
        var forSend = 
                      board[0][0]+' '+board[0][1]+' '+board[0][2]+' '+board[0][3]+' '+board[0][4]+' '+board[0][5]+' '+board[0][6]+'\r\n'+
                      board[1][0]+' '+board[1][1]+' '+board[1][2]+' '+board[1][3]+' '+board[1][4]+' '+board[1][5]+' '+board[1][6]+'\r\n'+
                      board[2][0]+' '+board[2][1]+' '+board[2][2]+' '+board[2][3]+' '+board[2][4]+' '+board[2][5]+' '+board[2][6]+'\r\n'+
                      board[3][0]+' '+board[3][1]+' '+board[3][2]+' '+board[3][3]+' '+board[3][4]+' '+board[3][5]+' '+board[3][6]+'\r\n'+
                      board[4][0]+' '+board[4][1]+' '+board[4][2]+' '+board[4][3]+' '+board[4][4]+' '+board[4][5]+' '+board[4][6]+'\r\n'+
                      board[5][0]+' '+board[5][1]+' '+board[5][2]+' '+board[5][3]+' '+board[5][4]+' '+board[5][5]+' '+board[5][6]+'\r\n'+
                      ':one: :two: :three: :four: :five: :six: :seven:' 
                     ;

                     function print(){
                        if(message2!=undefined){
                            message2.edit({embed});
                        }
                        else{
                            msg.channel.send({embed})
                            .then((message)=>{
                               message2 = message;
                            })
                        }
                       }  

                      function output(send){
                        var promise1 = new Promise(function(resolve, reject) {
                        forSend = 
                        board[0][0]+' '+board[0][1]+' '+board[0][2]+' '+board[0][3]+' '+board[0][4]+' '+board[0][5]+' '+board[0][6]+'\r\n'+
                      board[1][0]+' '+board[1][1]+' '+board[1][2]+' '+board[1][3]+' '+board[1][4]+' '+board[1][5]+' '+board[1][6]+'\r\n'+
                      board[2][0]+' '+board[2][1]+' '+board[2][2]+' '+board[2][3]+' '+board[2][4]+' '+board[2][5]+' '+board[2][6]+'\r\n'+
                      board[3][0]+' '+board[3][1]+' '+board[3][2]+' '+board[3][3]+' '+board[3][4]+' '+board[3][5]+' '+board[3][6]+'\r\n'+
                      board[4][0]+' '+board[4][1]+' '+board[4][2]+' '+board[4][3]+' '+board[4][4]+' '+board[4][5]+' '+board[4][6]+'\r\n'+
                      board[5][0]+' '+board[5][1]+' '+board[5][2]+' '+board[5][3]+' '+board[5][4]+' '+board[5][5]+' '+board[5][6]+'\r\n'+
                      ':one: :two: :three: :four: :five: :six: :seven:'  ;
                         embed = new Discord.RichEmbed()
                        .setTitle(names+turnmessage )
                        .setColor(colour[x])
                        .setDescription(forSend);
                        resolve();
                        })
                        promise1.then(function() {
                        send();
                        })
                      }


                    
                    
                

        var Round = 0;
    function ForCheck(){
        //console.log(board[toplayer[globalplace]+1][globalplace]);
        var connect = 1;
        var connect2 = 1;
        var connect3 = 1;
        var connect4 = 1;
        var i = 6;
        var j = 7;
        var tempx = toplayer[globalplace]+1;
        var tempy = globalplace;
        var tempx2 = toplayer[globalplace]+1;
        var tempy2 = globalplace;
    
        while(tempx<5&&tempy>0){
            tempx++
            tempy--
            //return bottom left corner
        }

        while(tempx2<5&&tempy2<6){
            tempx2++
            tempy2++
            //return bottom left corner
        }
    
        while(i>0){
            if(board[i][globalplace]==board[i-1][globalplace]&&board[i][globalplace]!=':black_circle:'){
                connect++;
                if(connect == 4){
                    finish = true;
                }
            }
            else{
                connect = 1;
            }
            i--
        }
        while(j>0){
            if(board[toplayer[globalplace]+1][j]==board[toplayer[globalplace]+1][j-1]&&board[toplayer[globalplace]+1][j-1]!=':black_circle:'){
                connect2++;
                if(connect2 == 4){
                    finish = true;
                }
            }
            else{
                connect2 = 1;
            }
            j--
        }
       
        while(tempx>0&&tempy<7){
            if(board[tempx][tempy]==board[tempx-1][tempy+1]&&board[tempx][tempy]!=':black_circle:'){
                connect3++
                if(connect3==4){
                    finish = true;
                }
            }
            else{
                connect3 = 1;
            }
            tempx--;
            tempy++
        }
       
        while(tempx2>0&&tempy2>0){
            if(board[tempx2][tempy2]==board[tempx2-1][tempy2-1]&&board[tempx2][tempy2]!=':black_circle:'){
                connect4++
                if(connect4==4){
                    finish = true;
                }
            }
            else{
                connect4 = 1;
            }
            tempx2--;
            tempy2--;
        }
        if(Round>=42&&finish!=true){
            draw = true;
            finish = true;
        }
    
}


    function CheckWin(){
        // board[toplayer[num-1]][num-1] = place chess
        Round++;
        ForCheck();
    }

                      function WriteAnswer(num){
                        var i , j;
                        var found = false;
                        try{
                            globalplace = parseInt(num-1);
                            board[toplayer[num-1]][num-1] = playerSymbol[x];
                            toplayer[num-1]--;
                    }
                    catch(error){
                        msg.channel.send('一個錯誤發生了,請自行負責!下一位!');
                    }
             }  


            function getAnswer(){
            var timeout = true;
            turnmessage = playerSymbol[x]+' '+player[x]+'的回合';
            output(print);
           
               
           
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
            collector2.on('end', (reaction, collector) => {
                if(!finish&&timeout==false){

                temp = temp + 1;
                x = temp % 2;
                turnmessage = player[x]+'的回合';
                getAnswer();
                }
                if(timeout==true){
                   turnmessage = '時間到!'+player[x]+'沒有行動所以輸了!';
                    output(print);
                }

                if(finish&&timeout==false&&draw==false){
                  
                   turnmessage = ':tada:'+player[x]+'嬴了!';
                   message2.react('🎉')
                   message2.react('👏');
                   output(print);
                }
                   
                if(finish&&timeout==false&&draw==true){
                    
                    turnmessage = ':tada:平手!!';
                   message2.react('🎉')
                   message2.react('👏');
                    output(print);
                 }
            })  

        }



        var timeout2 = true;
       // msg.channel.send(msg.author.username+'想跟你玩遊戲!請按下面的表情加入!')
       msg.channel.send({embed: {
        color: '65280',
        fields:[{
            name: '**'+msg.author.username+'** 想跟你玩遊戲!請按下面的表情加入!',
            value: '\u200b'
        },
    ]
}})
        .then((message)=>{
        message.react('503113045162065920')
        .then(()=>{
        const filter = (reaction, user) => reaction.emoji.id == "503113045162065920";
    let collector = message.createReactionCollector(filter, { time: 15000 });
    collector.on('collect', (reaction, collector) => {
        var play = reaction.users.map(m=>m.username);
        var play2 = reaction.users.map(k=>k);
        if(play[1]!=undefined){
            timeout2 = false;
            player[1] = play[1];
            msg.channel.send(player[1]+'已經加入遊戲!');
            names = '**'+playerSymbol[0]+' '+player[0]+' vs '+playerSymbol[1]+' '+player[1]+'\r\n**';
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