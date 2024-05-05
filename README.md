## Inspiration

Being a team of passionate mathematicians and physicists, we love creating animations and simulations of the laws of physics. We all remember when we created a two-body elastic collision simulation that resulted in the digits of PI. But not everyone has the capability to code such simulations. That's where we decided to create a web app based on LLM and OpenAI to mathematically create such physics simulations, both in 2D and 3D.

Imagine teachers using the software in their classrooms to quickly illustrate the beautiful meaning lying behind abstract formulas. In some way, the simulations have the capability to bring the formulas to life.

## What it does

Framer Ai features a stunning and intuitive UI. Users can log in and start prompting the system for the simulations/animations they would like to create. Framer allows users to make adjustments to their simulations, making them more personalized and interactive. It generates a new version of the simulation each time so that users can compare and choose the one that best suits their needs. Framer also stores all the simulations that users have created, making them easily accessible upon logging in, including the version history!

If you want to take the simulation code and tweak it yourself with some code, no worries! Our "View Code" functionality allows you to see the code that powers your simulation.

## How we built it

We set up Auth0 on the Next.js Framework to enable user authentication for the web app. We designed data models for the MongoDB database, including User, Document, and Version. The User model would be associated with the logged-in user and would contain all their documents (prompts). The Document model would contain the updated versions.

Next, we created a REST API to facilitate communication between the database, OpenAI, and Next.js. We configured OpenAI and created prompts for the user. Then, we fine-tuned the model to generate simulation code through p5.js (for 2D simulations) and Three.js (for 3D modeled simulations).

Subsequently, we developed the UI for the frontend and implemented all the components. To integrate internationalization into our project, we utilized the Replexica API. Additionally, we developed a novel module for managing i18n, simplifying the integration between the Replexica API and any React Web App, making it much more intuitive.

## Challenges we ran into

The first challenge we encountered was fine-tuning. Since there aren't plenty of simulations available on the internet, fine-tuning became more difficult. Additionally, finding the right parameters and model for OpenAI was challenging, as we required specific results in the form of HTML, CSS, and JS code generated by AI. Managing the amount of data and its rendering also added complexity to the web app. Each document could contain one or many versions, and we needed to render each version simultaneously. Eventually, we implemented hash tables for effective caching so that users wouldn't have to wait for the server to load all the versions at once.

Another challenge we faced was regarding our preference for i18n. Personally, I found libraries like react-intl to be unnecessarily complicated and difficult to set up and use. This led me to create a new library for internationalization. The library is directly connected to Replexica's AI-generated JSON files, simplifying the process.

## Accomplishments that we're proud of

We are proud that the final product turned out just as we imagined. We were able to implement all the features we planned for. Furthermore, we ensured that the app was efficient through the use of caching and optimized algorithms. This resulted in reduced latency and waiting time for the user, ultimately leading to a better overall user experience.

## What we learned

It was our first time working directly with fine-tuning. We weren't initially familiar with how parameter selection worked, but eventually, we found resources that guided us in understanding how data is formatted and parameters are chosen. Through learning and experimentation, we gained the necessary knowledge to successfully fine-tune our models.

## What's next for Framer AI

We would like to further develop Framer AI, not only to be based on prompts but also to transform it into a specialized Generative AI that computes advanced simulations. Furthermore, we plan to integrate the model into a code editor that will guide users step by step in developing the simulations.
