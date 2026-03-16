export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	image: string;
	content: string;
	date: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: "woah",
		title: "Writing a Lexer from Scratch",
		description: "A walk-through of tokenizing source text into a stream of typed symbols.",
		image: "https://picsum.photos/960/540?random=5",
		date: "2025-12-15",
		content: `
# Writing a Lexer from Scratch

*woah*

A lexer (or tokenizer) is the first step in many compiler and interpreter pipelines. It converts raw source text into a stream of meaningful tokens that a parser can work with.

## What is Tokenization?

Tokenization is the process of breaking down source code into logical units called tokens. Each token represents a meaningful symbol in the language—like keywords, identifiers, operators, and literals.

For example, the code:
\`\`\`
let x = 42;
\`\`\`

Would be tokenized into:
- Keyword: \`let\`
- Identifier: \`x\`
- Operator: \`=\`
- Number: \`42\`
- Punctuation: \`;\`

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
		`
	},
	{
		slug: "process-scheduling",
		title: "How Process Scheduling Actually Works",
		description: "Peeling back the OS abstractions to understand preemption and context switching.",
		image: "https://picsum.photos/960/540?random=6",
		date: "2025-12-10",
		content: `
# How Process Scheduling Actually Works

Process scheduling is one of the most critical responsibilities of an operating system. It determines which process gets CPU time and when context switches occur.

## The Scheduler's Job

The scheduler must balance:
- **Fairness**: Each process gets CPU time
- **Responsiveness**: Interactive processes respond quickly
- **Throughput**: System completes work efficiently
- **Resource Utilization**: CPU stays busy

## Scheduling Algorithms

### Round Robin
Each process gets a fixed time slice (quantum). When the quantum expires, the process goes to the back of the queue.

### Priority Queues
Processes have priority levels. Higher priority processes run before lower priority ones.

### Multilevel Feedback Queues
Combines priority levels with dynamic reprioritization based on behavior.

## Context Switching

When a context switch occurs:
1. Current process state is saved (registers, memory pointers)
2. New process state is loaded
3. CPU resumes executing the new process

This overhead is why excessive context switching can hurt performance!
		`
	},
	{
		slug: "backpropagation-visually",
		title: "Backpropagation, Visually",
		description: "Building up an intuition for gradients without drowning in the math.",
		image: "https://picsum.photos/960/540?random=7",
		date: "2025-12-05",
		content: `
# Backpropagation, Visually

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

\`f(g(h(x)))\`

The derivative is:
\`f'(g(h(x))) · g'(h(x)) · h'(x)\`

This is exactly what backpropagation does—it chains together local gradients!

## Why It Works

Each layer only needs to know:
- How to compute its output from its input
- How to compute gradients with respect to its parameters

The magic of backprop is that these local computations combine to give us gradients for the entire network.
		`
	},
	{
		slug: "pointers-not-scary",
		title: "Pointers Are Not Scary",
		description: "A ground-up explanation of memory addresses, dereferencing, and pointer arithmetic.",
		image: "https://picsum.photos/960/540?random=8",
		date: "2025-11-30",
		content: `
# Pointers Are Not Scary

Pointers are one of the most misunderstood concepts in C/C++. Once you understand what they actually are, they become quite elegant.

## What is a Pointer?

A pointer is simply a variable that stores a memory address. That's it. It's just a number that tells you where something lives in RAM.

## The & Operator

\`&\` is the "address-of" operator. It gives you the memory address of a variable:

\`\`\`c
int x = 42;      // x is stored at address, say, 0x7fff5fbff8ac
int *ptr = &x;   // ptr stores that address
\`\`\`

## The * Operator

When applied to a pointer, \`*\` "dereferences" it—it follows the address to get the value:

\`\`\`c
int value = *ptr;  // Gets the value at the address ptr points to
*ptr = 100;        // Changes the value x to 100
\`\`\`

## Pointer Arithmetic

Pointers support arithmetic operations:

\`\`\`c
int arr[10];
int *p = arr;
p++;           // Moves to next element (not just next byte!)
int second = *(p);  // Access second element
\`\`\`

The compiler handles scaling based on pointer type—that's the beauty!

## Why Pointers Matter

Pointers enable:
- **Dynamic memory**: Allocate memory at runtime
- **Efficiency**: Pass references instead of copying large data
- **Data structures**: Build linked lists, trees, graphs
- **Function callbacks**: Pass behavior around

Understanding pointers is key to C/C++ mastery.
		`
	},
	{
		slug: "attention-transformer-paper",
		title: "Attention Is All You Need — Annotated",
		description: "My line-by-line notes on the original transformer paper with diagrams.",
		image: "https://picsum.photos/960/540?random=9",
		date: "2025-11-25",
		content: `
# Attention Is All You Need — Annotated

The "Attention Is All You Need" paper introduced the Transformer architecture, which revolutionized NLP and beyond.

## The Key Innovation: Attention

Unlike RNNs that process sequences sequentially, Transformers use **attention** to look at all positions simultaneously:

\`attention(Q, K, V) = softmax(QK^T / √d_k)V\`

This allows:
- Parallel processing of sequences
- Direct connections between distant tokens
- Better training efficiency

## Query, Key, Value

Think of attention like a retrieval system:
- **Query**: "What am I looking for?"
- **Key**: "Here's what I represent"
- **Value**: "Here's my information"

For each position, we:
1. Compute attention scores: How relevant is each position to my query?
2. Normalize with softmax
3. Use scores to blend values

## Multi-Head Attention

Instead of one attention mechanism, use many in parallel:
- Each head learns different relationships
- Outputs are concatenated and projected
- This gives the model multiple "perspectives"

## Positional Encoding

Since we process all positions in parallel (no recurrence), we need to encode position information:

\`PE(pos, 2i) = sin(pos/10000^(2i/d_model))\`
\`PE(pos, 2i+1) = cos(pos/10000^(2i/d_model))\`

This embeds position in a learnable way.

## The Transformer Stack

- **Encoder**: Processes input with multi-head attention and feed-forward layers
- **Decoder**: Generates output with masked attention (can't look ahead)
- **Cross-attention**: Decoder attends to encoder outputs

The paper's genius was showing this simple combination of components could outperform complex RNN architectures!
		`
	}
];
