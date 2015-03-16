# v2.0.0

## Breaking changes

* The exposed function is now a constructor function expecting the pattern
* The created object provied two functions, `matches()` and `parse()`
    * `matches()` takes an url and returns `true` if it matches the pattern
    * `parse()` takes an url and returns an object w/ key-value-mappings if it matches the pattern

# v1.1.0

* Moved from splitting and looping over the patterns to regular expressions.
* Added Grunt

# v1.0.0

Hello, world
