# Parasite

## What Parasite does
1. Infects Elements (preferably provided by an Alchemist)
2. Enters the host and gathers information on how to mutate it.
3. Modifies it in a way that also effects children.

## Dangers
- Parasites modify **in place**, so if you plan on reusing your host then you should probably clone it.
- If parasites have faulty instructions the will be inaffective and enter *read-only* mode
- Parasitical mutations are very **unsafe** and should be used with caution to return a String
- A parasite ~is not as extensive as *Alchemist* and ~ is only aware of `Text` and `Element`
- Only Text Content and Attribute Values will be modified.

## History
- This was not introduced until v2
- In version v2.2 a slight modification was made to handle Templates internally, turns out `DocumentFragment` seemlessly integrate into the existing code without many changes (just a few characters)

## example
~~~ javascript
function genetics(value) {
		return 'INFECTED';
}

virus = new Parasite(genetics);
virus.infect(element);
~~~

## before
~~~ html
<div id="example">
	<span class="cool">content</span>
</div>
~~~

##  after
~~~ html
<div id="INFECTED">
	<span class="INFECTED">INFECTED</span>
</div>
~~~
