# Assignment WT2 - Web for Data Science

As data scientists, we constantly seek ways to gain insights from large datasets, visualize them effectively, and present our results engagingly. This involves efficient backend data handling, powerful data manipulation and analysis, and visually compelling, interactive front-end presentations. The goal is to move beyond static charts and create interactive visualizations that tell a story, empowering stakeholders to explore and derive their own insights.

**Objective:** Create a functional, visually engaging, and _interactive_ data visualization web application based on a large dataset. The application should be publicly accessible.

**Technologies:** You are free to use any technologies you feel comfortable with or wish to explore. Here are some suggestions:

**Backend:** Node.js/Express.js, FastAPI/Flask (Python), or other suitable backend framework.

**Database:** Choose an appropriate database:

- **SQL (e.g., PostgreSQL, MySQL):** For structured, relational data.
- **NoSQL (e.g., MongoDB):** For flexible, schema-less data.
- **Vector Database (e.g., Pinecone, Weaviate, Chroma):** _Required_ if you choose to implement the RAG enhancement for a VG grade (see below).

**Data Analysis & Processing:** Python/Pandas, or other suitable tools.

**Data Visualization:** D3.js, Chart.js, Plotly, or other suitable visualization libraries.

**Front-end Application:** HTML, CSS, JavaScript, Bootstrap, React.js, Vue.js, or other suitable front-end frameworks.

## Assignment Details:

**STEP 1: Data Acquisition:** Find a large dataset (minimum 1000 data points) that interests you. Kaggle ([https://www.kaggle.com/datasets](https://www.kaggle.com/datasets)) is a great resource, but explore other sources or APIs as well. _If you plan to do the VG RAG option, choose a dataset with a significant amount of text data (e.g., reviews, articles, descriptions)._

**STEP 2: Backend Development:** Design and build a backend to load, process, and serve your dataset. Choose an appropriate database. If you're doing the VG RAG option, this step will also involve setting up your vector database and preparing the text data for embedding.

**STEP 3: Visualization Development:** Create an insightful and _interactive_ visualization. Include controls like filters, search, or other mechanisms to allow dynamic data exploration.

**STEP 4: Front-end Development:** Develop the front-end application to display your data and visualization. Ensure clear front-end/back-end communication.

**STEP 5: Deployment:** Deploy your web application to a publicly accessible platform.

## Grading Criteria:

- **Pass (G):** A functional, visually engaging, and interactive data visualization web application that meets all the core requirements.
- **VG:** All the requirements for a "G" grade _plus_ the implementation of a basic Retrieval Augmented Generation (RAG) application. This involves:

  - Processing textual data from your dataset into embeddings (using a pre-trained embedding model
  - Storing these embeddings in a vector database.
  - Creating a simple search interface that allows users to enter text queries.
  - Retrieving relevant information from the vector database based on the query.
  - Displaying the retrieved information (e.g., as a list of relevant text snippets) in the web application.

## Example Use Case: Global Travel Insights (Illustrative)

**G-Level:** Interactive map displaying travel destinations, filterable by region, price, etc.

**VG-Level (RAG):** In addition to the G-level features, implement a search bar where users can enter queries like "best beaches in Thailand." The application retrieves relevant reviews or tips from the vector database and displays them alongside the map. You can use a pre-trained model for embeddings.

## Key Considerations for VG (RAG):

- **Pre-trained models:** Use readily available pre-trained embedding models
- **Focus on integration:** The emphasis is on integrating the RAG components into your web application, not on advanced NLP techniques.
- **Suggested Libraries and Techniques:**
  - **LangChain:** A powerful framework that simplifies the development of LLM-powered applications, including RAG. LangChain can help manage the different components of your RAG pipeline (embedding generation, vector database interaction, prompt engineering, and LLM calls).
  - **Agno (Phitdata):** A platform that can be used for embedding generation and other NLP tasks. If you choose to use Agno, explore their documentation and examples for integrating it into your RAG pipeline. Agno can be part of the backend pipeline.
  - **LLM Integration:** You can use open-source LLMs or APIs from providers like OpenAI. If you are using an open-source model, you may need to host it yourself or use a service that provides access to hosted models.

## Assignment Requirements

Make sure to read [all requirements of the application](../../issues/).

Pay extra attention to the labels indicating if the requirement is required ("req::required") or optional ("req::optional").

In this assignment, you must close issues that you implement.

Please also create additional issues (and close them) if you add any custom functionality.
