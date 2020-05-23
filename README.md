# reum
Reum is parser IF engine.

# Synopsys
```js
global.not = 'not'

now `player are in Test Room, player stands`
title `Test Room`
say `You are in Test Room. Here is bed.`

unless `player sitting on .+`
       `player sitting, player not stands`

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
     `player not sitting, player not sitting down on bed`
     
rule `stand`
     `player stands`
     `You already stands!`
     ``
     

```

# DSL
Reum uses simple embedded DSL.
```js
rule `event` `conditions` `text when condintions are met` `new facts`
now `new facts`
implement `action`
unless `facts` `then facts`
```

# Facts
Reum use facts, like Prolog. `Facts` is `Set()` of strings. `now` adds or removes facts from the `Facts`

```js
now `book is on the table, book not open`
```
Word `not` is fact's text makes the sentence negative, and removes `book open`-fact from `Facts`.

In the real world, some facts may lead to the disclosure of other facts. The real world is full of relationships between objects. Reum has a way to describe this relationship.

```js
unless `open`
       `not close`
```
