---
layout: mds
title: 'Range Queries, visualized (Part 3: Segment Trees)'
date: '2024-08-30'
image: '/range-queries-part-three/rqp3.jpg'
---

<script>
  import Link from "$lib/components/ui/Link.svelte"
  import Katex from 'svelte-katex'
</script>

## What are Segment Trees?

Binary Indexed Trees were cool, but it only did sum queries :(

Segment Trees are meant to be able to do minimum, maximum, and sum queries which is pretty awesome

It also works in O(log n) time for queries and updating the array in between these queries just like Binary Indexed Trees

The downside though is it’ll require more memory, and it’s a little bit harder to implement

For me personally, while it is harder to implement, I found it much easier to understand than Binary Indexed Trees

## How a Segment Tree works

A Segment Tree at it’s core is just a binary tree

Each parent, will have 2 child nodes or less, but for our implementation we’ll make sure they all have exactly 2 child nodes

In order to achieve this we have to make sure the length of the array is a power of 2, so it can be 1, 2, 4, 8, etc.

If it isn’t, and it has something like 6 elements, then we can just add 2 elements to the end with values of 0

Let’s use this array as an example: [5, 8, 6, 3, 2, 7, 2, 6]

Here’s how we’ll represent it as a tree:

<img src="/range-queries-part-three/image1.png" />

Keep in mind that this tree is only meant for sum queries it won’t work for minimum or maximum queries, but we’ll see how to do those later

In the tree you’ll also see that the parent node is simply the sum of the two children nodes

Let’s say we want to get the sum from index 2 to index 7 (inclusive, and it’s 0 indexed):

<img src="/range-queries-part-three/image2.png" />

Since we’ve computed the sums for both of the child nodes we can basically split up the array into ranges for which we’ve computed the values

In this example we’ split it up into the first range with 6 and 3 who’s sum is 9, and then the other range 2, 7, 2, and 6 who’s sum is 17

Since we know both of these sums we just add them together and get 26

Updating values is also quite simple

Let’s say we want to update the value at index 5 with value 7 to be a 10

We can first change that value:

<img src="/range-queries-part-three/image3.png" />

After that we can move up a level to update the parent node:

<img src="/range-queries-part-three/image4.png" />

And so on until we reach the root node:

<img src="/range-queries-part-three/image5.png" />

Boom, we’ve updated the tree in O(log n) time!

Awesome stuff

Now, it’s time to implement it

## Implementing a Segment Tree

### Sum Queries

So far we’ve visually been looking at a tree, but from the code, it’ll all be represented as an array

Here’s what it would look like (let’s call this array tree):

<img src="/range-queries-part-three/image6.png" />

Notice that it’s one indexed, but in the code you can just add an empty element at index 0

The way the tree is represented here is that tree[1] is the root node, it’s child nodes are tree[2] and tree[3], then the child nodes of tree[2] are tree[4] and tree[5], and so on

Here are some important things for traversing the tree:

- Getting to the two child nodes — You can use tree[2n] and tree[2n + 1] where n is the index of the current element. Let’s say n is 2 with value 22, it’s children are then tree[4] and tree[5] which have values 13 and 9, which is the correct answer
- Going up levels — To go from the current node to it’s parent node we can use tree[n / 2] where n is the index of the current element. If n is 8 with value 5 then tree[n / 2] is 4 with value 13 which is the parent

Using this we can use the following code to get the sum within the range of a to b:

```c++
int sum(int a, int b) {
    a += n; b += n;
    int s = 0;
    while (a <= b) {
	if (a % 2 == 1) s += tree[a++];
	if (b % 2 == 0) s += tree[b--];
	a /= 2; b /= 2;
    }
    return s;
}
```

Let’s go through it

We start off by doing a +=n and b +=n this is simply making this range start at the very last level

Let’s say we want to find the range from index 3 to 7, in that case a would become 11 and b would become 15 since the length of the array, n, is 8:

<img src="/range-queries-part-three/image7.png" />

We also have a variable s which contains the sum

Then we continue in the loop while the variable a is less than b because if the pointer a goes to the right of b it means we’ve reached the root node, and we’re done

Now, here’s the confusing part

The two if statements, we’re checking if a % 2 ==1 and if b % 2 == 0, and only then do we add the current node to the sum

Why these specific conditions?

Let’s go through the first iteration to see how it works

We’re checking if a % 2 == 1, and since a is 11, this condition is true

This means we select the current element 3

What if we didn’t select it though?

Well, which element would you select then?

The parent node, 9, is the sum of it’s two child nodes, but those aren’t a part of the range

If it’s still confusing then let’s look at b

The condition b % 2 == 0 will be false since b is 15, and that’s good!

If we did select the current element 6, then that’s wrong, because after that what would we have done?

Selected it’s parent node 8?

That would give us the wrong answer because if you do 8 + 6 you’re basically saying you want the range from 14 to 15, and also the element at 15

This means you’re basically adding a duplicate element, and that’s wrong

I hope this explains why we’re doing that modulo, we just want to check whether we should select the current node, or wait, and select some other parent node which contains the sum for the range we want

If we do go into the if statement then we also increment a and decrement b

This is because if we don’t then a might continue going to the left of the tree and that will be out of the range of our query, and therefore would have no meaning

This is why we’re basically “nudging” a to stay inside the range

The same logic applies to the variable b because it would also continue drifting off to the right, but if we decrement it then it’ll stay within the range

That’s quite a bit, but try debugging the code, that’s what helped me

The next lines of code are pretty simple, doing a /= 2 and b /=2 simply moves them up a level, and then we just return the sum s

### Minimum and maximum queries

To do a minimum or maximum query we use the exact same code as before

The only thing we change is how the tree is constructed

For minimum queries here’s what the tree would look like using the original array:

<img src="/range-queries-part-three/image8.png" />

Now we simply just query it the same as before starting at the bottom, and updating the minimum value as we go up

### Updating values

Here’s the code for updating a value k by x:

```c++
void add(int k, int x) {
    k += n;
    tree[k] += x;
    for (k /= 2; k >= 1; k /= 2) {
        tree[k] = tree[2*k]+tree[2*k+1];
    }
}
```

This code is much simpler

We again start at the bottom of the tree by doing k += n

Then update the current value there by x

Now we just want to move up the tree while updating the values

To do that we first move up a level with k /= 2

Then update the value at tree[k] by adding it’s two children using the expressions we had seen before

We keep on doing this until we reach the top of the tree, and we’ve updated the tree in O(log n) time!

## Conclusion

The code behind Segment Trees might be a little daunting at first, I personally found it very confusing to understand, but try debugging it line by line and creating diagrams, it’ll really help

If you have any questions, comments, or feedback then feel free to reach out to me on <Link href="https://www.linkedin.com/in/jinay-patel-6369002b4/" text="LinkedIn" />!

I also hope this entire series on Range Queries helped you, I’m also going to be releasing an article on Bit Manipulation soon!

Bye ✌️

## Bibliography

<Link href="https://cses.fi/book/book.pdf" text="Competitive Programmer’s Handbook" />
