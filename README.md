# MDCommunity

Takehome Task for MDandMe

### Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the 'Database'

   ```bash
    npx json-server db.json
   ```

3. Start the app in another terminal

   ```bash
    npm start
   ```

4. Launch the App to a Device/Simulator

   Note: I had developed mainly using an iPhone 16 Simulator as the target. I have not had the time to test on all variety of hardware/simulator + software combinations.

   ```
   i
   ```

# Functionality Checklist

- [x] Infinite Scroll

  - Uses debounce to prevent excessive function calls from holding at bottom of page
  - Scrolls the screen upon successful load of data as a form of user feedback, both on initial load (30px) and new page load (appr one post's height)
  - If reached end of list, the app will reflect that info to the user accordingly

- [x] Hugs

  - User can show support by hugging a post or a comment respectively
  - App tracks history of whether this "logged in" user has like a specific post or not
  - Should reflect more of a real app experience, since an anonymous person shouldn't be able to add any hugs, let alone 10000+ hugs to a single post/comment

- [x] Post Display

  - Two views: List Entry vs Full Screen
  - List Entry allows for multiple post to be viewed, although only the title and a truncated summary are available
  - Full Screen allows the user to fully view the post and see more details of the summary and chatbot assessment
  - In full screen mode, there is an ability to grow/shrink the description and Assessment both on the top and bottom of the text. I figured that since these can be extremely long paragraphs, there should be more locations to help hide text that you are done looking at.

- [x] Comment Display

  - Both the List Entry and Full Screen have easy access to the Comments, both at the bottom of the Post
  - User has ability to reply to a specific comment or post and it will be added to the DB accordingly and reflect upon reload

- [x] Draft Comment Prior to Submission

  - When drafting a comment, opens as a modal to maximize the screen real estate to help focus
  - User gets a small summary of what the post/comment entailed at the top
  - User gets a text input box that grows and shrinks relative the the internal text and the touch screen keyboard

- [x] Managed 'Logged In' User
  - Settings Icon at the top of Community page opens a modal that allows the user to edit their display_name that will be inserted when a submits a comment
  - Username persists on reload

## Future Scope?

- [ ] Add more variants & UI/UX functionality to the different core components

## Notes regarding development

### Front End Framework Philosophy

My pragmatic philosphy when it comes to managing a front end project is that there should be a foundational component library that developer that can cover over 70% of the work that needs to be written, and we can always customize the last 30% as necessary.

I suppose on a more ideal note, I think that it's best to be custom (or at least a custom wrapper) that maintained in-house so there doesn't become any weird dependencies on updates that are out of our hands.

### HTML vs CSS

In some way I like how React Native embraces stylesheets as the start of styling, because even in web apps I believe that styling should be colocated to the components that use them. In short, I agree with the tailwind philosophy when it comes to styling, and if I would even suggest that when it comes to the website.

### Data Management

In this project I went with a simple Context to manage the state of the front end. My reasons for this was primarily because the scope of the data management in this project is not so complicated as that it would demand a solution such as Redux.

However to prove a point that I am capable of managing prop drilling I have also done examples of such, primarily in the communityPostCard

I think the biggest reason against going for a heavy handed Redux solution is merely because the number of times that that state in the Context would be updated is low enough that it won't trigger full App rerenders. If the project had more pages that all access the same data then going with Redux would have been more appropriate.

### Functionality Adjustments & Changes

I had to reformat the db.json ever so mildly, but I just moved the array into a route so that I could paginate the response.

In an effort to emulate a logged in user, I assume that there is a table in the back end that tracks which user has liked which post/comment, so I added a

    'userHugged': boolean

entry to each post and comment to emulate that. This way the record of whether you've hugged the post/comment will persist after a reload.

I also added a small delay function to the API calls to simulate a real network, since the json-server is near instant and is something that would def be removed in any other context.
