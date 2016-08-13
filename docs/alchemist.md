# Alchemist

Alchemist is an elemental transformation microclass.

## Valid inputs
- jQuery object
- DocumentFragment
- Query Selector String
- Element

## output
- Element

It just takes things in and normalizes it, although very simple is also very necessary and is useful for more than just the template framework.

## Update
As of version 2.2.0 Alchemist doesn't actually do a whole lot other than handle Query Selectors officially.
Other functionality is still enabled but deprecated and otherwise unsupported.
The reasoning behind this is that templates shouldn't necisarrily have to only have *one* element inside of them, and in order to allow that functionality, we must leave the entire template Element rather than just the `firstElementChild` as was before.
Module **Parasite** now handles the recursion better in case it comes across this new change.
