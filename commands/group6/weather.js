const { Command } = require('discord.js-commando');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed
module.exports = class weather extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            aliases: ['天氣'],
            group: 'group6',
            memberName: 'weather',
            description: 'get weather',
            examples: ['-weather'],
   
        });    
    }
//              ,arg below
    run(msg) {
        var data;
        
const urlTestFeed = "http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml";

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
		console.log ("There are " + feedItems.length + " items in the HKO weather feed.\nBy "+msg.author.username);
		for (var i = 0; i < feedItems.length; i++) {
            data =feedItems[i].summary.replace(/<[^>]*>/g, '');
            data = data.replace('&#40050;','鱲');;
			var pos1 = feedItems[i].summary.indexOf('http://rss.weather.gov.hk/img/');
			var pos2 = feedItems[i].summary.indexOf('"',pos1+3);
			msg.channel.send(feedItems[i].title);
			msg.channel.send(feedItems[i].summary.slice(pos1,pos2));
            msg.channel.send(data);
        
			}
		}
	});
     } 
};
