/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('URLs exist and not empty', function () {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);

           });
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Names exist and not empty', function () {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);

           });
         });

       });

       /*  Defining a new test suite named "The menu" */
      describe('The menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default. We need to look for
         * the CSS first to determine how we're performing the
         * hiding/showing of the menu element.
         */
         // if body has a class of 'menu-hidden' then menu is hidden
         it('is hidden by default', function() {
          expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('hides and appear accordingly', function() {
          $('.menu-icon-link').click(); //After this click menu should appear and thus menu-hidden should be false
          expect($(document.body).hasClass('menu-hidden')).toBe(false);

          $('.menu-icon-link').click(); //After this click menu should disappear and thus menu-hidden should be true
          expect($(document.body).hasClass('menu-hidden')).toBe(true);


            });

          });
    /* This is a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
           loadFeed(0, done); // load once
       });

       it('exist one element at least', function() {
          expect($('.feed .entry').length).toBeGreaterThan(0);
       });
     });

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous so we need to use beforeEach and asynchronous done() function.
         */

         var initialFeed; //variable to store the initial field when beforeEach and asynchronous done() function is called

         beforeEach(function(done) {
            loadFeed(0, function() { // load once & get initial feed
                initialFeed = $('.feed').html();


                loadFeed(1, function() {

                    done();

                });


            });


          });

          it('is different from previous entry', function() {
            expect($('.feed').html()).not.toEqual(initialFeed); //comparing the new feed with the previous one.

        });
    });
}());
