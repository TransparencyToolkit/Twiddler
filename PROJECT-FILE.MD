Project File
============

The following is an example of a `twiddler.json` project file that gets generated when you create a new project, import files, scan a directory, or add some text for processing. Most of the fields are pretty straight forward and just describe the project and such. However, a few fields such as `sources, tools, formats` have more complexity, thus I go into more detail below

```
{
  "name": "twiddler-test-project",
  "title": "Twiddler Test Project",
  "description": "used for testing Twiddlers libraries, functions, and calls",
  "license": "PDDL-1.0",
  "version": "0.1.1",
  "sources": [
    {
      "source": "files/nested-directories.txt",
      "type": "file",
      "hash": "e1efbd1cf8a67ed0692a137ec26b49f54d3b0c0e"
    }
  ],
  "tools": [
    {
      "tool": "miner", "sources": ["e1efbd1cf8a67ed0692a137ec26b49f54d3b0c0e"], "opts":
        { "methods": ["clean", "trim", "toLower", "removeInterpunctuation", "removeDigits", "removeWords"] }
    }
  ],
  "output": "default",
  "order": true,
  "formats": ["json"],
  "state": "new"
}
```


### Sources

The `sources` array contains objects that look like this. There can be any number of items inside of `sources.item` 

```
{
  "source": "path/to/directory-of-files/",
  "type": "directory",
  "hash": "6d4e99d714ebeabe1d925178c76326c293df46af"
}
```


### Tools

The `tools` array contains objects such as the following items

```
{ "tool": "scrub", "sources": ["6d4e99d714ebeabe1d925178c76326c293df46af"], "opts":
  [{ "scrub": "clean", "all": true }, { "scrub": "trim", "start": 1, "end": 3 }, { "scrub": "grow", "start": "[ ] " }]
}
```

### Output

Twiddler currently only knows how to handle one value for the `output` attribute and that value is `default` in the future this value will allow for "templates" that allow different data structures than the normal `{ unsorted: [], groups: {} }` object.

### Formats

Twiddler current supports exporting to only three formats

```
md
json
dpkg
```
