Train Ticket Machine

Overall Structure:
- State is managed through the Pinia store.
- Composables handle business logic and connect views to the state.
- Lean view components.

Main Design Pattern:
Presenter/Container & Facade: While I find MVC a bit too rigid in some ways, especially in component-based languages, I still like to keep it in mind as a guideline for defining clear boundaries between different "types" of logic. I find that maintaining these boundaries makes adjacent processes—like testing, documentation, and tooling—so much easier. That’s why I chose this pattern as the main structure for this small project.

A/B Testing Decisions:
- When developing a system, I like to ask myself: "What's the usual pain point when using a service like the one I'm creating?" The main struggle I find with these keyboard grids is the placement of the buttons. They rarely conform to the same standard, making the input process take longer than necessary.
- For this reason, I decided to test two keyboard layouts: one where all buttons are styled the same, and another where "action buttons" (The erase last character and space buttons) have distinct styling. I’m not tracking conversion rates, as I didn’t see the point given the nature of a code assignment. However, this could definitely be included in the Potential Improvements section.

Analytics:
- I implemented analytics events to track user behavior patterns, which could provide insights for future UX/UI improvements. In this implementation, analytics events are logged to the console instead of being sent to an analytics provider. In a production environment, these events would be sent to the chosen analytics service. This is also why you won’t see any analytics indicators when accessing the application through the Docker container.

Containerization:
- The application is containerized using a multi-stage Docker build. The Vue app is compiled and served through Nginx for efficient static file delivery and a small production footprint.

Unused Styling:
- I kept some default .scss files in the root styling directory, even though they define styles that aren’t used in components. The reasoning behind this was to demonstrate a general understanding of working with .scss.

Potential Improvements:
- I wrapped the main orchestrator view (<StationSearch />) in an ErrorBoundary, as well as the root level of the application.
- Initially, I considered adding a specific ErrorBoundary for the keyboard grid section, but I realized it wouldn’t serve much purpose in the context of a station booking screen. If the main logic fails, it’s better to trigger the generic ErrorBoundary, as this avoids confusing the user with an error message that only wraps the keyboard grid. That said, an ErrorBoundary specific to the keyboard grid does highlight a drawback of this pattern: since the keyboard component doesn’t fully control its own business logic, errors within it don’t trigger an ErrorBoundary as easily as they would in a more self-contained approach.
- I think we’ve all used these types of touch screens before, and "speed" isn’t usually a word we associate with them. This next runtime optimization might be overkill, but we could use Web Workers to precalculate available character options when there are only a few left for the user to choose from. This would free up the main thread for UI interactions and optimize data operations.
- The favicon should be .ico rather than .png.
