let readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

say    = ([string]) => console.log('|',string) || true
title  = ([string]) => console.log("| \x1b[47m\x1b[30m %s \x1b[0m",string) || true
dialog = string => console.log("- \x1b[36m%s\x1b[0m",string) || true
help   = string => console.log("? \x1b[33m%s\x1b[0m",string) || true
error  = string => console.log("! \x1b[31m%s\x1b[0m",string) || true
list   = array  => array.map(e => console.log('*',e.name))

onFailAction  = () => error("Ты не можешь это сделать по очевидным(и не очень) причинам.")
onRetryAction = () => error("But you already do it...")
onUnknownWord = () => error("Unknown command!")

Rules = []
Facts = new Set()

rule = ([event]) => ([conds]) => ([action]) => ([postconds]) => Rules.push({event: new RegExp(event.trim()), conds: conds.split(',').map(e => e.trim()), action, postconds})

implement = ([event]) => {
	for(rule of Rules){
		rule.event.test(event)
		&&
		rule.conds.every(cond => cond.indexOf(' не ') == -1 ? Facts.has(cond) : !Facts.has(cond.replace(' не ',' ').trim()))
		&&
		say([rule.action])
		&&
		now([rule.postconds])
	}
}
now = ([conds]) => conds.split(',').forEach(cond => cond.indexOf(' не ') == -1 ? Facts.add(cond.trim()) : !Facts.delete(cond.replace(' не ',' ').trim()))
assert = now
retract = ([cond]) => Facts.delete(cond)


function input(string){
	implement([string])
}

prompt = '@ '
function start(){
	rl.question(prompt, (answer) => {
		input(answer)
		start()
	});
}

module.exports = {prompt,start,rule,implement,now,assert,retract,say,error,help,title,dialog,error,list,Facts,Rules}