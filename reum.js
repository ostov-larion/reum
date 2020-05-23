let readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// * Printing Functions
say    = ([string]) => console.log('|',string) || true
title  = ([string]) => console.log("| \x1b[47m\x1b[30m %s \x1b[0m",string) || true
dialog = string => console.log("- \x1b[36m%s\x1b[0m",string) || true
help   = string => console.log("? \x1b[33m%s\x1b[0m",string) || true
error  = string => console.log("! \x1b[31m%s\x1b[0m",string) || true
list   = array  => array.map(e => console.log('*',e.name))

// * Register
Rules = []
Facts = new Set()
Antonyms = []
Synonyms = []
grammar = {
	not: 'not',
	isPositive(sent){
		return sent.indexOf(' '+grammar.not+' ') == -1 
	},
	isNegative(sent){
		return !grammar.isPositive(sent)
	},
	toPositive(sent){
		return sent.replace(grammar.not+' ','').trim()
	},
	toNegative(sent){
		return grammar.not + ' ' + sent
	}
}


// * Compute Function
computeOpposition = fact => {
	for({when,then} of Antonyms){
		if(grammar.isNegative(fact) && new RegExp(when).test(fact)) return grammar.toPositive(fact.replace(when,then))
		if(grammar.isNegative(fact) && new RegExp(then).test(fact)) return grammar.toPositive(fact.replace(then,when))
		if(new RegExp(when).test(fact)) return grammar.toNegative(fact.replace(when,then))
		if(new RegExp(then).test(fact)) return grammar.toNegative(fact.replace(then,when))
	}
}

computeUnless = fact => {
	for({when,then} of Synonyms){
		when.every
	}
}

// * Decorators
afterEffect = (fn1,fn2) => new Proxy(fn1,{apply: (t,ctx,args) => (t.apply(ctx,args),fn2.apply(ctx,args))})

// * Helpers
splitComma = str => str.split(',').map(e => e.trim())
from = from => ({to: fn => fn(from)})

// * DSL
rule = ([event]) => ([conds]) => ([action]) => ([postconds]) => Rules.push({event: new RegExp(event.trim()), conds: splitComma(conds), action, postconds})

implement = ([event]) => {
	for(rule of Rules){
		rule.event.test(event)
		&&
		rule.conds.every(cond => grammar.isPositive(cond) ? Facts.has(cond) : !Facts.has(grammar.toPositive(cond)))
		&&
		say([rule.action])
		&&
		now([rule.postconds])
	}
}
now = ([conds]) => splitComma(conds).forEach(cond => grammar.isPositive(cond) ? Facts.add(cond) : Facts.delete(grammar.toPositive(cond)))
now = afterEffect(now,([conds]) => splitComma(conds).forEach(cond => {
	let opp = computeOpposition(cond)
	if(grammar.isNegative(cond)){
		opp && Facts.add(opp)
	}
	else{
		opp && Facts.delete(grammar.toPositive(opp))
	}
}))

antonyms = ([when]) => ([then]) => Antonyms.push({when, then})
synonyms = ([when]) => ([then]) => Synonyms.push({when, then})

// * Main Loop
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

module.exports = {prompt,start,rule,implement,now,synonyms,antonyms,say,error,help,title,dialog,error,list,Facts,Rules,grammar}