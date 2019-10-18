const { Command } = require('discord.js-commando');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
module.exports = class sukebaipantsu extends Command {
    constructor(client) {
        super(client, {
            name: 'sukebai',
            group: 'group6',
            memberName: 'sukebai',
            description: 'sukebai',
            examples: ['sukebai'],
            args: [
                {
                    key: 'page',
                    type: 'integer',
                    prompt:'wrong!',
                    default : '1',
                }]
   
        });    
    }
//              ,arg below
    run(msg,{page}) {
      msg.delete();
        var urlTestFeed = "https://sukebei.pantsu.cat/feed?";
        var i;
        var data;
        if(!msg.channel.nsfw){
            msg.channel.send('請步行至老司機頻道再開車!');
            return;
        }

function getFeed (urlfeed, callback) {
	var req = request (urlfeed);
	var feedparser = new FeedParser ();
	var feedItems = new Array ();
	req.on ("response", function (response) {
		var stream = this;
		if (response.statusCode == 200) {
			stream.pipe (feedparser);
			}
		});
	req.on ("error", function (err) {
		console.log ("getFeed: err.message == " + err.message);
		});
	feedparser.on ("readable", function () {
		try {
			var item = this.read (), flnew;
			if (item !== null) { //2/9/17 by DW
				feedItems.push (item);
				}
			}
		catch (err) {
			console.log ("getFeed: err.message == " + err.message);
			}
		});
	feedparser.on ("end", function () {
		callback (undefined, feedItems);
		});
	feedparser.on ("error", function (err) {
		console.log ("getFeed: err.message == " + err.message);
		callback (err);
		});
	}
 
getFeed (urlTestFeed, function (err, feedItems) {
	if (!err) {
		function pad (num) { 
			var s = num.toString (), ctplaces = 3;
			while (s.length < ctplaces) {
				s = "0" + s;
				}
			return (s);
			}
        console.log ("There are " + feedItems.length + " items in the sukebai feed.\nBy "+msg.author.username);
        
		for (var i = ((page*10)-9); i < (page*10)+1; i++) {
            msg.channel.send({embed: {
                color: '16761035',
                fields:[{
                    name : i,
                    value: '['+feedItems[i].title+']('+feedItems[i].guid+')'
                },
            ]
        }})
		
            
			}
		
		}
	});
     } 
    }