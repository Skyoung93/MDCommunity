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

3. Start the app

   ```bash
    npm start
   ```

4. Launch the App to a Device/Simulator

   Note: I had developed mainly using an iPhone 16 Simulator as the target. I have not had the time to test on all variety of hardware/simulator + software combinations.

   ```
   i
   ```

# Comments & Notes

### Front End Framework Philosophy

My pragmatic philosphy when it comes to managing a front end project is that there should be a foundational component library that developer that can cover over 70% of the work that needs to be written, and we can always customize the last 30% as necessary.

I suppose on a more ideal note, I think that it's best to be custom (or at least a custom wrapper) that maintained in-house so there doesn't become any weird dependencies on updates that are out of our hands.

### HTML vs CSS

In some way I like how React Native embraces stylesheets as the start of styling, because even in web apps I believe that styling should be colocated to the components that use them. In short, I agree with the tailwind philosophy when it comes to styling, and if I would even suggest that when it comes to the website.

### Data Management

In this project I went with a simple Context to manage the state of the front end. My reasons for this was primarily because the scope of the data management in this project is not so complicated as that it would demand a solution such as Redux.

I think the biggest reason against going for a heavy handed Redux solution is merely because the number of times that that state in the Context would be updated is low enough that it won't trigger full App rerenders. If the project had more pages that all access the same data then going with Redux would have been more appropriate.

### Functionality Adjustments & Changes

I had to reformat the db.json ever so mildly, but I just moved the array into a route so that I could paginate the response.

In an effort to emulate a logged in user, I assume that there is a table in the back end that tracks which user has liked which post/comment, so I added a

    'userHugged': boolean

entry to each post and comment to emulate that. This way the record of whether you've hugged the post/comment will persist after a reload.
