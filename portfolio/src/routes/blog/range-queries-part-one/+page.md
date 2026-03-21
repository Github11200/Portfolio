---
layout: mds
title: 'Range Queries, visualized (Part 1: Static Queries)'
date: '2024-08-22'
image: '/range-queries-part-one/rqp1.jpg'
---

<script>
  import Link from "$lib/components/ui/Link.svelte"
  import Katex from 'svelte-katex'
</script>

## What are range queries?

You’re given a subarray of an array, so if the original array is [1, 2, 3, 4, 5] you could be given [1, 2, 3] or [4, 5].

Your task is to perform one of the following operations:

- sum(a, b): Calculate the sum of values in range [a, b]
- min(a, b): Find the minimum value in range [a, b]
- max(a, b): Find the maximum value in range [a, b]

<img src="/range-queries-part-one/image1.png" />

Seems pretty simple right? Honestly, it is, if you want to do it in O(n) time. In order to optimize it you have to go a little bit more complex, but don’t worry, it’ll be pretty chill.

## Static array queries

In a static array query the array just will not change in between queries.

This means if you’re given [1, 2, 3, 4, 5], and you find the sum of [1, 2, 3], then after that the array won’t have elements added, removed, or changes, it’ll just stay the same.

## Sum queries

Let’s say we’re given the following array, [1, 3, 4, 8, 6, 1, 4, 2], and we want to perform a sum query on it, so we want to find the sum from let’s say [0, 3] which corresponds to the elements [1, 3, 4, 8], and their sum is 16.

We could of course just loop through the array in O(n) time, and we’ll have our answer, but we can also create a data structure in O(n) time, and when we go to do our queries it will only take O(1), constant time, to get the result!

The thing we’ll use to create the data structure is called a prefix sum array, here’s an example:

```js
original_array = [1, 3, 4, 8, 6, 1, 4, 2];
prefix_sum_array = [1, 4, 8, 16, 22, 23, 27, 29];
```

Here we create a new array where each value is going to be the sum of all the values from the original array up to that point.

Now, it’s pretty simple, all we need to do to find the sum of [a, b] is find the value at index b in the prefix sum array, and subtract that from the value at index (a — 1) from the prefix sum array.

Let’s say we want to get the sum from [2, 5], this subarray is [4, 8, 6, 1]. We get the value from the prefix sum at index 5, which is 23, and subtract it from the value at index 1, which is 4, and so we get 23–4 = 19.

Here’s the generalized formula:

$$
Sum(l, r) = PrefixSum[r] - PrefixSum[l - 1]
$$

Boom, we can query it in O(1) time! 😀

## Minimum queries

We’ll just be looking at just minimum queries since it’s basically the same concept for maximum queries.

Anyways, minimum queries are a little more complicated, but don’t worry, just read it all through, and you’ll get it!

Let’s say we’re given the same array as before again, [1, 3, 4, 8, 6, 1, 4, 2].

What we’re going to do to create the data structure is calculate the minimum values in subarrays where their lengths are powers of 2.

You’ll see why this is important later on, but it’s really cool!

Here’s the values that will be calculated from the array:

<img src="/range-queries-part-one/image2.png" />

You can see the lengths, like from 0 to 3, are 4, or from 2 to 3 are 1 since they are both powers of 2.

This will take O(n log n) time since we go through all the elements in the array, and then calculate log(n) values since we are doing it by powers of 2.

Now how do we actually calculate the minimum values within these ranges? In the image of the table it mentions a function called minq(a, b), how does it work?

Let’s get to that.

Scary equation alert ⚠️😬

Well, that’s a lot, but don’t worry, once it clicks, it’ll stay with you forever.

Let’s break it down by what’s being passed into the parameters first.

The variables a and b are the range as we’ve see so far, so something like [2, 5].

In the first recursive call we are passing in the variable a, and then for the variable b we are passing in (a + w — 1).

Then if we move onto the second recursive call you’ll see we pass in (a + w) as the parameter for a.

Here the variable w is the following equation:

The top part of the equation is simply getting the length of the array and then we are just dividing it by 2 to get half of the length of the array.

Why is this the case though?

Well, we’re literally just splitting the array in half, and giving each function those halves.

If you’re familiar with merge sort this should be basically the same.

Words don’t always help though, let’s look at the function calls visually. In the image we are going to use a function called m to represent the minq function.

Here’s what the recursive function calls look like:

<img src="/range-queries-part-one/image3.png" />

Now let’s see what they all return.

<img src="/range-queries-part-one/image4.png" />

I also put the array in as reference because the parameters are indexes of the array, just keep that in mind.

We can finally create the data structure now.

That’s right, that was only the data structure, only half way there 😭.

Scary equation alert ⚠️😬

Let’s dissect this one now, it’s meant to actually find the minimum value in the subarray.

Here’s the main idea behind getting the minimum value in a range [a, b].

Let’s say we want to find it in the range of [1, 6]:
Competitive Programmer’s Handbook
<img src="/range-queries-part-one/image5.png" />

Remember how we calculated the minimum values when the lengths were powers of 2?

This is where that comes in, let’s split this range into 2 ranges each of length 4, which is a power of 2, which means we already have it calculated!

<img src="/range-queries-part-one/image6.png" />

<img src="/range-queries-part-one/image7.png" />

Since we have the minimum values of each of the subarrays saved in the data structure we can just get the values from there, so the left range has a minimum value of 3, and the right range has a minimum value of 1.

Finally we just take the minimum of 3 and 1 and we have our answer! 🤯

That means in the range [1, 6] the minimum value is 1, and we calculated it in O(1) time!

Now let’s look at the equation.

You’ll see we are splitting the array again since we’re making two function calls.

Here the variable k is the **largest power of 2 that doesn’t exceed the length of the subarray.**

Let’s say the length of the subarray were 8, then the largest power of 2 to the power of 3 which is 8!

In this example the length of the subarray was 6, sot he largest power of 2 was 4, because 8 would be too big.

Then for the left side of the array we simply go from a to (a + k), and in the example k was 4, so the length of the left subarray is 4.

Tt’s the same thing for the right subarray as well where we start from (b — k) and go up to b, again the resulting subarray will be of length 4.

There you have it! We can calculate the minimum value of a subarray in O(1) time after creating it’s data structure in O(n log n) time.

## Conclusion

If you have any questions, comments, or feedback feel free to drop them in the comment section down below, or DM me on LinkedIn!

In the second part we’re going to be looking at binary trees, and then in the third part we’ll look at segment trees!

It’s really fun stuff, so stay tuned!

## Bibliography

<Link href="https://cses.fi/book/book.pdf" text="Competitive Programmer’s Handbook" />

Thanks for reading! Subscribe for free to receive new posts and support my work.
