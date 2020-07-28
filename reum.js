let readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// * Printing Functions
header  = ([string]) => `| \x1b[47m\x1b[30m${string}\x1b[0m`
say = (strings,...data) =>
	console.log(
		strings.map( (e,i) =>(
			(e && e[0]!='\n'?'| ':'') +
			(!/^\n(\t)+$/.test(e)?e.replace(/(\n((\t|\s)+))/g,'\n| '):'\n') + (data[i]?data[i]:'')
		))
		.join('') + '\n|'
	) || true

dialog = ([string]) => `- \x1b[36m${string}\x1b[0m`
help   = ([string]) => `? \x1b[33m${string}\x1b[0m`
error  = ([string]) => `! \x1b[31m${string}\x1b[0m`

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
title = ([string]) => process.title = string

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

module.exports = {
	prompt,
	start,
	rule,
	implement,
	now,
	synonyms,
	antonyms,
	say,
	error,
	help,
	title,
	header,
	dialog,
	error,
	Facts,
	Rules,
	grammar
}