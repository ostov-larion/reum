# reum
Reum is parser IF engine.

# Synopsys
```js
global.not = 'not'

now `player are in Test Room, player stands`
title `Test Room`
say `You are in Test Room`
rule `sit down on bed`
     `player stands, player are in Test Room`
     `You sat down on the bed. This bed is very comfortable.`
     `player not stands, player sitting down on bed, player sitting`
     
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
```

# Facts
Reum use facts, like Prolog. `Facts` is `Set()` of strings.
