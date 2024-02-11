In episode 1 we went over the basic outline of rules and sections as well as operators. In today's episode we will drill down even further.

Let's bring back the Movie from episode 1, that we wanted to add into our new collection.

<p align="center">
<img alt="poster" src="../images/movie_poster.png" width="150" height="250"></img>
</p>

This movie has the following attributes across Plex, OverSeerr, and Radar:

**Plex** -

| Added | Last Viewed | Times Viewed | Audience Rating |
| -------|-------------|--------------|---------------- |
| 3Nov2023 | 10Jan2024 | 4 | 7.3 |

**OverSeerr** -

| Requested by | Requested Date | Times Requested by Anyone|
| ------------| --------------- | ------------- |
| user_girl123 | 2Nov2023 | 4 |

**Radarr** -

| Release Date | Is Monitored | Runtime |
| ------------ | ------------ | ------- |
| 31Oct2023 | True | 114 minutes |

With this information, we have quite a few options that we can use as rule parameters/filters.

## Examples

### Simple AND

- 1: We can use one rule that states `Plex-Date Added` `before` `amount of days` `60`.
  - This will match in our special tutorial scenario because the day the Movie was added to Plex happened "before" today's date.
- 2: We could use a rule that states `Plex-Times Viewed` `bigger` `number` `3`.
  - This would get added because it has a *Times Viewed* value of 4, which is bigger than 3.
- 3: We could also use a rule that states `Plex-Audience Rating (scale 1-10)` `bigger` `number` `5`.
  - The rule would catch our movie because it's *Audience Rating* is 7.3. Which is bigger than 5.

### Double AND

- 1: We could add Rule 1 that states `Plex-Date Added` `before` `amount of days` `60`. Rule 2 that states AND `Plex-Times Viewed` `bigger` `number` `5`.
  - This would not catch our movie because it has a *Times Viewed* value of 4 and we need it to match <font color=yellow> (rule 1 AND rule 2)</font>. It does match rule 1 but it does not match rule 2. If another movie in the library was added 60 days ago or more **AND** it had a view count of 10. It **WOULD** get added to this rule.
- 2: Let's try one more. Rule 1 states `Plex-Times Viewed` `bigger` `number` `3`. Rule 2 states AND `Overseerr-Amount of Request` `equals` `Plex-Times Viewed`.
  - This rule-set **WOULD** add our movie because it's *Times Viewed* amount is 4 (bigger than 3), **AND** the *Amount of Request*(4) from Overseerr **EQUALS** the *Times Viewed*(4) amount from Plex.

Those are some fairly simple AND examples, and hopefully it is starting to become obvious what is going on. Within a *section*, and only using AND operators, each item needs to match the rule before it to be counted as a match and added to the collection.

Another way to look at these examples, is that within a *section*, each rule is making a list. The next rule is checking that list to see if anything ALSO has that value, plus the value of it's own rule.

Here is a visual:

 ```mermaid
 graph LR
A[Does it have 4 times viewed?] -->B[Yes]
    B --> C[AND is it monitored in Radarr?]
    C -->|Yes| D[Add it to the collection]
    C -->|No| E[Don't add to the collection.] 
```
### Single OR
