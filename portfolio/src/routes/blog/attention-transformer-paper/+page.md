---
layout: mds
title: 'Attention Is All You Need — Annotated'
date: '2025-11-25'
image: 'https://picsum.photos/960/540?random=9'
---

The "Attention Is All You Need" paper introduced the Transformer architecture, which revolutionized NLP and beyond.

## The Key Innovation: Attention

Unlike RNNs that process sequences sequentially, Transformers use **attention** to look at all positions simultaneously:

`attention(Q, K, V) = softmax(QK^T / √d_k)V`

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

`PE(pos, 2i) = sin(pos/10000^(2i/d_model))`
`PE(pos, 2i+1) = cos(pos/10000^(2i/d_model))`

This embeds position in a learnable way.

## The Transformer Stack

- **Encoder**: Processes input with multi-head attention and feed-forward layers
- **Decoder**: Generates output with masked attention (can't look ahead)
- **Cross-attention**: Decoder attends to encoder outputs

The paper's genius was showing this simple combination of components could outperform complex RNN architectures!
