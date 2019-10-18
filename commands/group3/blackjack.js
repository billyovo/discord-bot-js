const { Command } = require('discord.js-commando');
const Discord = require("discord.js")
const request = require('request');
module.exports = class ListOfCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'blackjack',
            aliases: ['bj'],
            group: 'group3',
            memberName: 'blackjack',
            description: 'blackjack',
            examples: ['-blackjack'],
            throttling: {
                usages: 1,
                duration: 10
            },
        });
    }
    run(msg) {
        var card_init = [];
        card_init["2"] = {
            display: ":two:",
            value: 2 
        }
        card_init["3"] = {
            display: ":three:",
            value: 3 
        }
        card_init["4"] = {
            display: ":four:",
            value: 4 
        }
        card_init["5"] = {
            display: ":five:",
            value: 5 
        }
        card_init["6"] = {
            display: ":six:",
            value: 6 
        }
        card_init["7"] = {
            display: ":seven:",
            value: 7
        }
        card_init["8"] = {
            display: ":eight:",
            value: 8 
        }
        card_init["9"] = {
            display: ":nine:",
            value: 9 
        }
        card_init["10"] = {
            display: ":keycap_ten:",
            value: 10 
        }
        card_init["JACK"] = {
            display: ":regional_indicator_j:",
            value: 10
        }
        card_init["QUEEN"] = {
            display: ":regional_indicator_q:",
            value: 10
        }
        card_init["KING"] = {
            display: ":regional_indicator_k:",
            value: 10
        }
        card_init["ACE"] = {
            display: ":regional_indicator_a:",
            value: 11
        }
        var readymessage;
        var embed;
       // var createdreactor = false;

        var Dealer = {
            cards : [],
            cards_display : [],
            total : 0
        }
 
        var Players = [];
        Players[0] = {
            name: msg.author.username,
            stand: false,
            stand_display: "►",
            total: 0,
            cards: [] ,
            cards_display: []
        }
        var deckid;

        function EnterGame(){
            var temp = 1;
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
                if(temp>0&&temp<4){
                var play = reaction.users.map(m=>m.username);
                var play2 = reaction.users.map(k=>k.id);
                if(play2[play2.length-1] !='414662329217843201'&&play2[play2.length-1]!=msg.author.id){
                    
                    
                Players.push({
                    name: play[play.length-1],
                    stand: false,
                    stand_display: "►",
                    total: 0,
                    cards: [] ,
                    cards_display: []
                });

                temp++;
            
                //Players[play2[play2.length-1]].cards = initCards();
            }
                
               
               
            }
            if(temp>=4){
                collector.stop();
            } 
            
            });
            collector.on('end', (reaction, collector) => {
                message.clearReactions();
                return initCards();
            })       
              })
            }) 
        }

        function createDeck(){
            request.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4', {
        }, function(error, response, body) {
            if(!error){
        
                var deck = JSON.parse(body);
                deckid = deck["deck_id"];
              // msg.channel.send("Success! DeckID = "+deckid);
               request.get('https://deckofcardsapi.com/api/deck/'+deckid+'/draw/?count=2', {
            },   function(error, response, body) {
                var cards_draw = JSON.parse(body);
                Dealer.cards.push(card_init[cards_draw.cards[0]["value"]].value);
                Dealer.cards_display.push(card_init[cards_draw.cards[0]["value"]].display);
                Dealer.cards.push(card_init[cards_draw.cards[1]["value"]].value);
                Dealer.cards_display.push(card_init[cards_draw.cards[1]["value"]].display);
               // console.log(Dealer);
            })
             //  console.log(initCards());
            }})
        }

        function initCards(){
            var total = 1;
           // https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
           
           Players.forEach(function(element) {
           // console.log(element);
          
                    request.get('https://deckofcardsapi.com/api/deck/'+deckid+'/draw/?count=2', {
            },   function(error, response, body) {
                
                try{
                var cards_drawn = JSON.parse(body);
                for(var j=0;j<cards_drawn.cards.length;j++){
                    element.cards.push(card_init[cards_drawn.cards[j]["value"]].value);
                    element.cards_display.push(card_init[cards_drawn.cards[j]["value"]].display);
                    
            }
            total++;
            if(total> Players.length){
                displayCards();
                
            }
        }
        catch(error){
            msg.channel.send("一個錯誤發生了");
        }
           
            
            
            
            })
        
        })
        

        }


function displayCards(){
    calculateTotal();
   embed  = new Discord.RichEmbed()
    .setTitle("This is a blackjack game")
    .setColor("FFB6C1")
    .addField(":moneybag: Dealer | Total: **"+Dealer.total+"**",Dealer.cards_display.join(" "));
    for(var i=0;i<Players.length;i++){
    //    if(Players[i].cards_display.length>=2){
       
        embed.addField(Players[i].stand_display+" "+Players[i].name+ " |  Total : **"+Players[i].total+"**", Players[i].cards_display.join(" "));
       // msg.channel.send(Players[i].name+ " :  Total : **"+Players[i].total+"** \r\n"+ Players[i].cards_display.join(" "));
     //   }
    }
    if(readymessage==undefined){
    msg.channel.send({embed})
    .then((message1)=>{
        
        readymessage = message1;
        message1.react('➕').then(MessageReaction => {
            message1.react("⏹")
            .then(MessageReaction => {
            const filter2 = (reaction,user) => (reaction.emoji.name==="➕"||reaction.emoji.name==="⏹"); 
            //message1.react("⏹");
            var collector2 = message1.createReactionCollector(filter2, { time: 30000 });
            
            collector2.on('collect', (reaction, collector2) => {
           //     msg.channel.send(reaction.emoji.name);
              
                if(reaction.emoji.name==="➕"){
                    var reacted = reaction.users.map(m=>m.username);
                        for(var i=1;i<reacted.length;i++){
                       
                        var reactedID = reaction.users.map(m=>m.id);
                        var person = reactedID[i];
                        reaction.remove(person);
                        DrawOneCard(reacted[i]);
                        }
                    
                    
            //    DrawOneCard(reacted[1]);
                
                }

                if(reaction.emoji.name==="⏹"){
                
                        var reacted2 = reaction.users.map(m=>m.username);
                        var reactedID2 = reaction.users.map(m=>m.id);
                        var person2 = reactedID2[1];
                        for(var i=1;i<reacted2.length;i++){
                        if(person2!="414662329217843201"&&person2!=undefined){
                        reaction.remove(reactedID2[i]);
                        Stand(reacted2[i]);
                        if(isStoodUp())
                        {
                            collector2.stop();
                        }
                       // console.log(isStoodUp());
                        }
                    }
                }
                
        })
        collector2.on('end', (reaction, collector2) => {
            DealerDrawCard();
            // checkWin();
         })    
    })
})
})
         
        
    

       // const filter2 = (reaction,user) => (reaction.emoji.id==="➕"||reaction.emoji.id==="⏹");
    
}
else{
    readymessage.edit({embed})
}
  


   
}


function calculateTotal(){
    var temp = 0;
    var Acecounter = 0;
    var temp2 = 0;
    var Acecounter2 = 0;
    for(var k=0;k<Dealer.cards.length;k++){
        temp2 += Dealer.cards[k];
        if(Dealer.cards[k]==11){
            Acecounter++;
        }
    }
    Dealer.total = temp2;
    while(Dealer.total >21&&Acecounter>0){
        Dealer.total = Dealer.total-10;
        Acecounter--;
    }
    for(var i=0;i<Players.length;i++){
        for(var j=0;j<Players[i].cards.length;j++){
            temp += Players[i].cards[j];
            if(Players[i].cards[j]==11){
                Acecounter2++;
            }
        }
        
        Players[i].total = temp;
        while(Players[i].total>21&&Acecounter2>0){
            Players[i].total = Players[i].total-10;
            Acecounter2--;
        }
        Acecounter2 = 0;
        temp = 0;
    }
}

function DrawOneCard(nam){
    var now;
    for(var i=0;i<Players.length;i++){
        if(nam == Players[i].name){
            now = i;
            request.get('https://deckofcardsapi.com/api/deck/'+deckid+'/draw/?count=1', {
            },   function(error, response, body) {
                if(Players[now].total<21&&Players[now].stand==false&&Players[now].cards.length<5){
                var cards_drawn = JSON.parse(body);
                Players[now].cards.push(card_init[cards_drawn.cards[0]["value"]].value);
                Players[now].cards_display.push(card_init[cards_drawn.cards[0]["value"]].display);
                displayCards();
                
                }
            })
           
        }
    }
}

function Stand(nam){
    var now;
    for(var i=0;i<Players.length;i++){
        if(nam == Players[i].name){
            now = i;
            Players[now].stand = true;
            Players[now].stand_display = "∎";
            displayCards();
            
        }
    }
}

function isStoodUp(){
   var stand = true;
   var stood = Players.map(m=>m.stand);
   for(var i=0;i<Players.length;i++){
       if(Players[i].stand==false){
           return false;
       }
   }
   displayCards();
    return true;
}

function DealerDrawCard(){
   // msg.channel.send("why i doesn't work??");
    if(Dealer.total<17&&Dealer.cards.length<5){
    request.get('https://deckofcardsapi.com/api/deck/'+deckid+'/draw/?count=1', {
            },   function(error, response, body) {
                var cards_draw = JSON.parse(body);
                Dealer.cards.push(card_init[cards_draw.cards[0]["value"]].value);
                Dealer.cards_display.push(card_init[cards_draw.cards[0]["value"]].display);
                displayCards();
                DealerDrawCard();   
            })
        }
        else{
          return checkWin();
        }
}



function checkWin(){
    for(var i=0;i<Players.length;i++){
        if(Dealer.total>21){
            if(Players[i].total>21){
                Players[i].stand_display= ":negative_squared_cross_mark:";
            }
            else{
                Players[i].stand_display = ":white_check_mark:";
            }
        }
        else{
            if(Players[i].total>Dealer.total&&Players[i].total<=21){
                Players[i].stand_display= ":white_check_mark:";
            }
            else{
                Players[i].stand_display = ":negative_squared_cross_mark:";
            }
        }
    }
   
        displayCards();

}
        createDeck();
        EnterGame();
       // console.log(DrawCards());
           




      //  msg.channel.send(Players['395454424954437632'].name+" testing");

    }
}