# Changelog

## v 1.0.5

* added outline and changed line-height of modal close button
* tweaked modal content padding
* refactored warning messages
* updated core-js and eslint

## v 1.0.4

* TicTacToeInfoBar.js and its dependencies are loaded dynamically using ```import()```
* KeyBindings.js and its dependencies are loaded dynamically using ```import()``` 
* changed layout and font size of modal content
* changed modal close button to FontAwesome  *timesCirlcle* svg
* text in option items no  longer moves slightly up when selected
* applied ```user-select: none``` to the remaining elements that were selectable
* cell buttons on touch-enabled devices will trigger on touch start instead of  on click
* removed double-tap to zoom on browsers that support *touch-action* rule.

## v 1.0.3

* reworked the focus trap of the modal
* changed focus style of the modal close button
* reduced duration from .5s to .4s of all the animations of the modal
* added prettier _v1.8.2_ as precommit hook
* reformatted `js, css and json` files using prettier.js
* the button that closes the modal is always on screen
* removed css animation glitch in Edge and IE11 that occurs when the modal is fading out.

## v 1.0.2

* added support for IE 11 ([see polyfills.js](./src/polyfills.js))
* updated dependencies
* fixed layout of print version
* tweaked css layout

## v 1.0.1

* modal close-button no longer disappear during the fadeout transition
* modal close-button no longer overlaps the text
* when installed, the app no longer forces portrait orientation
* various refactoring
* removed leftover code of previous iterations
* added changelog

## v 1.0.0

* Initial Commit
