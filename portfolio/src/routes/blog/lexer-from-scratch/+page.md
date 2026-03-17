---
layout: mds
title: 'Writing a Lexer from Scratch'
date: '2025-12-15'
image: 'https://picsum.photos/960/540?random=5'
---

A lexer (or tokenizer) is the first step in many compiler and interpreter pipelines. It converts raw source text into a stream of meaningful tokens that a parser can work with.

## What is Tokenization?

Tokenization is the process of breaking down source code into logical units called tokens. Each token represents a meaningful symbol in the language—like keywords, identifiers, operators, and literals.

For example, the code:

<br />

```js
let x = 42;

function doSomething() {
	let y = 20;
}
```

Would be tokenized into:

- Keyword: `let`
- Identifier: `x`
- Operator: `=`
- Number: `42`
- Punctuation: `;`

## Key Components

1. **Character Stream**: The raw input source code
2. **Lexical Rules**: Patterns that define what constitutes each token
3. **Token Emitter**: Logic that groups characters and emits tokens

## Implementation Strategy

The most common approach is using a finite state machine (FSM) that:

- Reads characters one at a time
- Maintains state about what kind of token we're building
- Emits complete tokens when we reach delimiters or state changes

This is a foundational skill that will help you understand compilers at a deeper level!
