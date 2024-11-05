
Rules are the engine of Maintainerr. Media will be tested against the rule parameters and added to a collection, if they are a match.
When media exists in the collection for a specified amount of time, they'll be deleted from disk & external applications.

Once you complete and save your rule, Maintainerr will generate a collection. The collection will only be visible/synced to Plex if it contains media.

> Rule handling is a batch process that runs every 8 hours. You can manually trigger it with the `Run rules` button on the 'rules' page.

## Creating rules

### General { .annotate }

General info about the rule. Some of the information specified here will be shown on the generated collection. In here you also specify how to handle the collection.

| Parameter                        | Description |
| ---------------------------- | ----------- |
| Name                         | The Rule and Plex Collection name |
| Description                  | Description of the Rule. This is also used as the Collection's description |
| Library                      | Which Plex library's media to use |
| Media type                   | The type of TV media the rules will apply to, either the entire show, only seasons or only episodes |
| Radarr Action                | Unmonitor or delete movies from Radarr |
| Sonarr Action                | Unmonitor or delete series from Sonarr |
| Active                       | If inactive, the rule won't run |
| Show on home                 | Show the rule's collection on the Plex home screen |
| Add list exclusions          | Prevent *arr import lists from re-adding media that has been removed by Maintainerr |
| Media deleted after days     | Amount of days media will live in the collection before deletion |
| Use rules                    | Disable the rule engine, in case you want to add media manually |
| Force reset Overseerr record | Force resets the Overseerr record instead of relying on availability-sync. 'Enable CSRF Protection' needs to be disabled in Overseer's settings for this to work. [^1] |
| Custom collection            | Use a manual collection. Media will sync from Plex to Maintainerr. Maintainerr will never remove this collection from Plex |
| Custom collection name       | The name of the manual collection to use [^2] |

[^1]:
    This is the old method of telling Overseerr that something has been removed. The default method now, is to tell Overseerr to initiate an `Availability Sync`, through its API. This happens automatically after something has been removed.
[^2]: Only shown and needed when the Custom Collection checkbox is checked.  

## TV media type

With the 'Media type' parameter you're able to specify the type of media that should be used for a TV library. This allows to run rules on either a selection of shows, seasons or episodes.

For instance, this makes it possible to create rule groups that select & delete old/watched seasons of a tv show, without removing the newer seasons.

> Because you can't mix media types on a Plex collection, Maintainerr also doesn't allow the use of multiple types on a rule group / collection.

> Executing rules on episodes takes a lot longer than shows & seasons because Maintainerr has to sift through more data

## Disabling rules & manual collections

In case you want to manage the collection manually, or with another program, there's the possibility to disable Maintainerr's collection system by specifying a manual collection.
Maintainerr will sync all media added/removed from the Plex collection into it's internal collection.

> !!! warning
     If media is excluded in Maintainerr, but is added manually to the Plex collection, the exclude will be ignored.

Additionally, you can disable the rule system by unchecking the 'use rules' checkbox.

## Sections

A section is a group of rules. What happens to the result of a section depends on the choice of `Operator` in the section's first rule.

### Adding new sections

The `New section` button, at the bottom of the form, is only available if all rules are completed.

## Adding rules

Adding a rule is done by using the `Add` button next to a section title. If the button is not available, it means your current rule isn't finished yet.

A rule consists of at least 4 values. If the `second value` contains a custom value, a `custom value` parameter will also pop up.

Starting from the second rule or section, a `operator` parameter is also required. Here you must specify the action to take on the results of the previous rule.

| Param        | Description                                    |
| ------------ | ---------------------------------------------- |
| Operator     | Action to take on the previous rule or section |
| First value  | The first value to compare with                |
| Action       | The comparable action to take                  |
| Second value | The second value to compare with               |
| Custom value | A custom value input                           |

## Operators

There are 2 operator choices, both explained below. </br>
The choice of operator defines what happens to the result of each section or rule.

### AND

Using this operator, the rule will run against the result of the previous rule (or section).
The output of the rule will then be passed on to the next rule.

### OR

Using this operator, the rule will start off with all media and add it's result to the previous rule (or section) result.
The output of the rule will then be passed on to the next rule.

## Actions

The action defines the way the `first value` and `second value` will be compared. </br>
The available actions are dependent on the type of the `first value`

| Action                    | Description                                                                                                                               | Types              |
| ----------                | -----------------------------------------------------------                                                                               | ------------------ |
| bigger                    | Is the `first value` bigger than the `second value` ?                                                                                     | number             |
| smaller                   | Is the `first value` smaller than the `second value` ?                                                                                    | number             |
| contains                  | Does the `first value` contain the `second value`? Lists will confirm the existence of an exact match within the `first value` list       | number, text       |
| contains (partial)        | Does the `first value` contain the `second value` ? Lists will confirm the existence of a partial match within the `first value` list     | number, text       |
| not contains              | Does the `first value` lack the `second value`? Lists will indicate the absence of an exact match within the `first value` list.          | number, text       |
| not contains (partial)    | Does the `first value` lack the `second value` ? Lists will indicate the absence of a partial match within the `first value` list.        | number, text       |
| equals                    | Is the `first value` equal to the `second value` ?                                                                                        | number, text, date |
| not equals                | Is the `first value` unequal to the `second value` ?                                                                                      | number, text, date |
| before                    | Does the `first value` occur before the `second value` ?                                                                                  | date               |
| after                     | Does the `first value` occur after the `second value` ?                                                                                   | date               |
| in last                   | Does the `first value` occur in the last x amount of days ?                                                                               | date               |
| in next                   | Does the `first value` occur in the next x amount of days ?                                                                               | date               |

Contains in conjunction with lists will check if at least 1 value in the `second value` list matches a value in the `first value` list. So, for example, if `first value` contains the list ["test1", "test2"] and `second value` contains the list ["test3", "test1"], the result will be true because "test1" is available in both.

The difference between 'Contains' and 'Contains (partial)' is only apparent with text list values. When comparing a text list, 'Contains' will only return true if the 'second value' exactly matches a value in the 'first value' list. 'Contains (partial)' will return true if the 'first value' list has a value that partially matches the 'second value' (or an item in the 'second value' list). Otherwise, both options behave the same.

## Custom values

The `Second value` field allows some custom values. The available custom values are dependent on the type of `first value`.

| Action | Description | Types |
| ------------- |------------- | ------------- |
| Custom days | This behavior depends on the selected `action`. In case of `in_last` or `in_next`, this translates to 'in the last (or next) x days'. in case of `before` the value will be translated to the current date **subtracted** by the amount of `custom days`. In all other cases, the amount of days will be **added** to the current date | date  |
| Custom date | Takes a specific date | date |
| Custom number | Takes a specific number | number |
| Custom text | Takes a specific text | text |

You can incorporate text lists as custom values using JSON notation. For example, specifying ["Jef", "Frank", "Wilhelm"] will be parsed and treated as a list.
