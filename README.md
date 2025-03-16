## Assignment 6 Talk With You 
#### Submitted by: Patsachon Pattakulpong st124952

## Source Discovery
This repository contains a Retrieval-Augmented Generation (RAG) chatbot built using LangChain, designed to answer questions about my personal information. The project is based on the 01-rag-langchain.ipynb notebook from the code-along session, modified to complete Task 1: Source Discovery as outlined below. The chatbot leverages a quantized fastchat-t5-3b-v1.0 model for text generation, FAISS for vector storage, and a custom prompt for gentle, informative responses.
#### Documents 
- The goal was to identify and list all relevant sources containing my personal information, such as documents, websites, and personal data, to be ingested into the RAG system.
- My Document: Personal_Info-4.pdf, Description: Core personal information document.

## Analysis and Problem Solving
**1. List of Retriever and Generator Models**
The RAG system combines a retriever to fetch relevant document chunks and a generator to produce responses. Below are the models utilized:
#### Retriever Model
- Model: **FAISS (Fast Approximate Nearest Neighbors Search)** is a vector store-based retriever using cosine similarity to fetch relevant chunks from embedded documents.
- Implementation: Uses **hkunlp/instructor-base** embeddings to convert text into vectors, stored in a FAISS index.
- Configuration: Default settings with chunk_size=700 and chunk_overlap=100.
#### Generator Model
- Model: **lmsys/fastchat-t5-3b-v1.0** is T5-based sequence-to-sequence model fine-tuned for conversational tasks, quantized for efficiency.
- Implementation: Loaded with 4-bit quantization using BitsAndBytesConfig.
- Configuration: max_new_tokens=256, temperature=0 (deterministic output), repetition_penalty=1.5 (reduces repetition)
- Pipeline: Integrated via HuggingFacePipeline in LangChain.

**2. Analysis of Issues with Unrelated Information**
The RAG system occasionally provides unrelated or hallucinated information, which was analyzed based on model outputs, below are **issues that observed after performing Retriever and Generator**
#### Retriever Relevance:
- Problem: **FAISS** retrieves chunks based on semantic similarity, but irrelevant chunks may still rank high if query terms loosely match unrelated sections.
- Example: For "What are your core beliefs regarding technology?", the retriever includes chunks about education and experience alongside philosophy, diluting focus.
- Cause: Broad chunk size (700 characters) and overlap (100 characters) may include extraneous context.
#### Generator Relevance:
- Problem: **fastchat-t5-3b-v1.0** sometimes generates details not present in the retrieved context, especially for open-ended questions.
- Example: ("How do you think cultural values should influence technological advancements?"), the response lists "1. Respect for diversity, 2. Privacy, 3. Community needs, 4."—the fourth point is cut off, and some elaboration (e.g., "does not discriminate") exceeds the source document (Personal_Info-4.pdf).
- Cause: T5’s generative nature fills gaps when context is sparse, despite temperature=0.
#### Prompt: 
- Problem: The original "PattyBot" prompt was overly general, leading to responses drifting from personal info.
- Example: Answers occasionally include speculative content (e.g., "technology can be used to manipulate") beyond the document’s scope.
#### Proposed Solutions
**Retriever Tuning:**
- Reduce chunk_size (e.g., to 500) and adjust chunk_overlap (e.g., to 50) for tighter relevance.
- Increase retriever k (top-k results) and filter with a relevance threshold.
**Generator Improvement:**
- Switch to a stronger model like **meta-llama/Llama-7b-hf** or **gpt-3.5-turbo** (explored in Task 1) for better context adherence.
- The reason that i cannot use Llama is that im not meet the criteria for downloading from META, and for GPT 3.5 i have a limit access for GPT.

# sorry i understand the theory so i write it down but cant put it in practice sorry
