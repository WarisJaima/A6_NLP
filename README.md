## Assignment 6 Talk With You 
# Source Discovery
### This project develops a RAG chatbot using LangChain, based on the 01-rag-langchain.ipynb notebook. It retrieves and generates responses about my personal information, using FAISS for vector storage and fastchat-t5-3b-v1.0 for text generation.

# Documents
### Personal_Info-4.pdf – Core personal information document.
# Issues & Analysis
### Retriever Issues: FAISS retrieves irrelevant chunks due to broad chunk size (700) and loose semantic matches.
### Generator Issues: fastchat-t5-3b sometimes hallucinates details beyond the source document.
### Prompt Issues: The general prompt leads to speculative responses.
# Proposed Solutions
### Retriever Tuning: Reduce chunk size (500), adjust overlap (50), and refine top-k filtering.
### Generator Improvement: Upgrade to Llama-7B or GPT-3.5, but access restrictions limit this option.
# sorry i understand the theory so i write it down but cant put it in practice sorry
