# reum
Reum is language-independent parser Interactive Fiction engine.

# Synopsys
```js
let {now, title, say, synonyms, antonyms, rule,start} = require('reum')

now `player are in Test Room, player stands`
title `Test Room`
say `You are in Test Room. Here is bed.`

synonyms `sitting on something`
         `sitting`
       
antonyms `sitting` `stands`

rule `sit down on bed`
     `player stands, player are in Test Room`
     `You sat down on the bed. This bed is very comfortable.`
     `player sitting down on bed`
     
rule `sit down on bed`
     `player sitting down on bed`
     `But you already doing it...`
     ``
     
rule `stand`
     `player sitting down on bed`
     `You stands up bed.`
     `player not sitting`
     
rule `stand`
     `player stands`
     `You already stands!`
     ``
     
start()
```

# DSL
Reum uses small embedded DSL.
```js
rule `event` `conditions` `print this text, if condintions are met` `new facts, if conditions are met.`
now `new facts`
implement `action`
unless `facts` `then facts`
opposite `antonym #1` `antonym #2`
```

# Facts
Reum use facts, like Prolog. `Facts` is `Set()` of strings. `now` adds or removes facts from the `Facts`

```js
now `book is on the table, book not open`
```
Word `not` makes the sentence negative, and Reum removes `book open`-fact from `Facts`.

In the real world, some facts may lead to the disclosure of other facts. The real world is full of relationships between objects. Reum has a way to describe this relationship.

```js
opposite `open` `close`
```
If something is open, it is'nt close, and vice versa, if something is close, it is'nt open.

# Actions
Action is string, which is entered by the player and triggers event.
implement `open book`

# Rules
Rules implements Event-Condition-Action pattern for game code design.
```js
rule `open book`             // Event
     `book is close`         // Conditions
                             // Actions
     `You are opened book!`  // | String, which printed
     `book is open`          // | New facts
```
