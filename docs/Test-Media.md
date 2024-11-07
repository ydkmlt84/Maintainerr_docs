---
status: new
---

# Test Media

Maintainerr comes with a built-in feature to test your ruleset against your media, and display the results to you. This can be done without ever running a rule or creating collections in Plex. Sometimes, it is hard for you to determine why something was or wasn't added to a collection. Using the Test Media feature can be an extremely useful tool in helping you figure out what is going on.

## Test Media button

The first thing you must do, in order to use this function, is to create a rule. More on that can be found in the Rules documentation, as well as in the Walkthroughs.

<p align="center" markdown>

[Rules](https://docs.maintainerr.info/Rules/){ .md-button .md-button--primary }

[Walkthroughs](https://docs.maintainerr.info/blog/){ .md-button .md-button--primary }

</p>

After creating your rule, and saving it, you will be brought back to the Rules page. Now you want to click on the Collections tab on the left menu. Here you will be shown all of your collections.

Click on the name of the collection that you want to test rules for. You will be taken to the Collection's page. Here you will see the Test Media button at the top left. You can also see any exclusions that you may have setup for this collection, as well as information regarding the collection items.

 ![test-media](images/test-media-button.png)

## Test Media popup

Depending on what type of library/media this collection is for, you will have different options at the top of this popup.

| ----- | -------- |
| Media | Name of a Movie or TVShow that you want to test |
| Season | Select which season you want to test (if TV) |
| Episode | Select the episode you want to test (if TV) |
| Output | The test results in YAML format |

### Test your media

When you first come to the Test Media page the media field will say `Start typing...`. This is where you will start typing the name of a Movie or TVShow. As you type there will be options that popup (from your library), similar to how Google search works. You can search for any Movie or any TVShow, regardless of what library the rule is tied to, as long as the type is the same. You can't search for a Movie if the type of library is TV. Select the item, choose the season and episode if applicable, then click on test at the bottom.

### Test output

Below is an example of your test's output.

```yaml
- plexId: 73061
  result: false
  sectionResults:
    - id: 0
      result: false
      ruleResults:
        - operator: OR
          action: equals
          firstValueName: Overseerr - Requested in Overseerr
          firstValue: null
          secondValueName: boolean
          secondValue: 1
          result: false
    - id: 1
      result: false
      operator: OR
      ruleResults:
        - operator: OR
          action: before
          firstValueName: Plex - Date added
          firstValue: 2022-11-14T03:07:53.000Z
          secondValueName: custom_days
          secondValue: 2024-09-08T19:12:59.844Z
          result: true
        - operator: AND
          action: equals
          firstValueName: Overseerr - Requested in Overseerr
          firstValue: null
          secondValueName: boolean
          secondValue: 1
          result: false
```

### Test Output breakdown

<div class="grid" markdown>

``` title="this is the plexid of the tested item, and the overall result"
- plexId: 73061
  result: false
```

``` title="this is the output of the rule's section 1"
- id: 0
  result: false
  ruleResults:
    - operator: OR
      action: equals
      firstValueName: Overseerr - Requested in Overseerr
      firstValue: null
      secondValueName: boolean
      secondValue: 1
      result: false
```

</div>
