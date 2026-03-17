---
layout: mds
title: 'Backpropagation, Visually'
date: '2025-12-05'
image: 'https://picsum.photos/960/540?random=7'
---

Backpropagation is the algorithm that powers training in deep neural networks. Instead of deriving all the math, let's build intuition through visualization.

## The Core Idea

Neural networks learn by:

1. Making a prediction
2. Measuring how wrong it was (loss)
3. Computing gradients: "How much does changing each weight affect the loss?"
4. Adjusting weights in the direction that reduces loss

## Forward Pass

During the forward pass, data flows through the network layers:

- Input → Dense Layer → Activation → Dense Layer → Output

Each layer applies transformations, building up the final prediction.

## Backward Pass

During the backward pass, error information flows backward:

- We compute how much each layer's output contributed to the loss
- We trace this back through the computation graph
- We calculate gradients for every parameter

## The Chain Rule

The key mathematical insight is the chain rule from calculus. If you have nested functions:

`f(g(h(x)))`

The derivative is:
`f'(g(h(x))) · g'(h(x)) · h'(x)`

This is exactly what backpropagation does—it chains together local gradients!

## Why It Works

Each layer only needs to know:

- How to compute its output from its input
- How to compute gradients with respect to its parameters

The magic of backprop is that these local computations combine to give us gradients for the entire network.
