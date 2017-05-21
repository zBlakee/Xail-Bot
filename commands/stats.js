const Canvas = require('canvas');
const userStats = require('./../bot.js');
const path = require('path');
const request = require('request-promise');
const { promisifyAll } = require('tsubaki');
var expToNextLevel = 0;
const fs = promisifyAll(require('fs'));
const sql = require('sqlite');
sql.open('./score.sqlite');

exports.run = (client, message, args) => {
args = args.toString();
args = args.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");

message.guild.fetchMember(args.split(" ").toString()).then(function(member) {
sql.get(`SELECT * FROM scores WHERE userId ='${member.id}'`).then(row => {

async function drawStats () {
message.delete();	

if (`${row.level}` == 1) {
	expToNextLevel = "250";
} else if (`${row.level}` == 2) {
	expToNextLevel = "500";
} else if (`${row.level}` == 3) {
	expToNextLevel = "750";
} else if (`${row.level}` == 4) {
	expToNextLevel = "1000";
} else if (`${row.level}` == 5) {
	expToNextLevel = "1250";
} else if (`${row.level}` == 6) {
	expToNextLevel = "1500";
} else if (`${row.level}` == 7) {
	expToNextLevel = "1750";
} else if (`${row.level}` == 8) {
	expToNextLevel = "2000";
} else if (`${row.level}` == 9) {
	expToNextLevel = "2500";
} else if (`${row.level}` == 10) {
	expToNextLevel = "3000";
} else if (`${row.level}` == 11) {
	expToNextLevel = "4000";
} else if (`${row.level}` == 12) {
	expToNextLevel = "5000";
} else if (`${row.level}` == 13) {
	expToNextLevel = "6000";
} else if (`${row.level}` == 14) {
	expToNextLevel = "7000";
} else if (`${row.level}` == 15) {
	expToNextLevel = "8000";
} else if (`${row.level}` == 16) {
	expToNextLevel = "9001";
} else if (`${row.level}` == 17) {
	expToNextLevel = "10000";
} else if (`${row.level}` == 18) {
	expToNextLevel = "11000";
} else if (`${row.level}` == 19) {
	expToNextLevel = "12000";
} else if (`${row.level}` == 20) {
	expToNextLevel = "13000";
} else if (`${row.level}` == 0) {
	expToNextLevel = "100";
}

if (`${row.level}` > 20) {
expToNextLevel = "MAX";
}

function fontFile (name) {
  return path.join(__dirname, '..','/assets/', 'stats', 'fonts', name)
}

Canvas.registerFont(fontFile('UniSansHeavy.ttf'), { family: "Uni Sans CAPS"}) // eslint-disable-line max-len
Canvas.registerFont(fontFile('Roboto.ttf'), { family: 'Roboto'}) // eslint-disable-line max-len
const Image = Canvas.Image;

var canvas = new Canvas(300, 120)
var ctx = canvas.getContext('2d')
const base = new Image();
const cond = new Image();

const generate = () => {
// Environment Variables
			ctx.drawImage(base, 0, 0, 300, 300);
			ctx.scale(1, 1);
			ctx.patternQuality = 'billinear';
			ctx.filter = 'bilinear';
			ctx.antialias = 'subpixel';
			ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
			ctx.shadowOffsetY = 2;
			ctx.shadowBlur = 3;
			
// Username
			ctx.font = '16px Roboto';
			ctx.fillStyle = member.displayHexColor;
			ctx.fillText(member.displayName, 75, 35);
			
// Role
			ctx.font = '12px Roboto';
			ctx.fillStyle = member.displayHexColor;
			ctx.fillText(member.highestRole.name.toUpperCase(), 75, 50);

// EXP TITLE
			ctx.font = '22px Uni Sans Heavy CAPS';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#E5E5E5';
			ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
			ctx.fillText('EXP.', 150, 87);			
			
// EXP
			ctx.font = '16px Roboto';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#d1d1d1';
			ctx.shadowColor = 'rgba(0, 0, 0, 0)';
			ctx.fillText(`${row.experience}/${expToNextLevel}`, 150, 105);

// LVL
			ctx.font = '22px Uni Sans Heavy CAPS';
			ctx.textAlign = 'left';
			ctx.fillStyle = '#E5E5E5';
			ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
			ctx.fillText('LVL.', 74, 87);

// LVL Number
			ctx.font = '19px Roboto';
			ctx.fillStyle = '#E5E5E5';
			ctx.fillText(`${row.level}`, 74, 107);
			
		
// Image
			ctx.beginPath();
			ctx.arc(40, 40, 25, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.clip();
			ctx.shadowBlur = 5;
			ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
			ctx.drawImage(cond, 15, 15, 50, 50);
};

base.src = await fs.readFileAsync('./assets/stats/backgrounds/default.png');
cond.src = await request({
			uri: member.user.avatarURL() ? member.user.avatarURL('png') : member.user.displayAvatarURL,
			encoding: null
		});

generate();

return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'stats.png' }] });
}

drawStats();

});	
})
}