// New array of callbacks
var scrollCallbacks = [];
var onLoadCallbacks = [];

// The number of pixels down before adding any 
// scroll down classes
var scrollDownDetectStart = 50;

//
//   ForEach helper method to support older browsers
//   that do not have foreach
//
function ForEach(array, callback)
{
    // Loop each item
    for (var i = 0; i < array.length; i++)
    {
        // Call function
        callback(array[i]);
    }
}

//
//   Calls the given function passed in
//   whenever the page is scrolled
//
function OnScroll(callback)
{
    // Add callback to list
    scrollCallbacks.push(callback);
}

//
//   Calls the given function passed in
//   whenever the page is loaded
//
function OnLoad(callback)
{
    // Add callback to list
    onLoadCallbacks.push(callback);
}

// Called whenever a scroll happens
// (at a nice interval not on every single pixel scroll)
function ProcessScroll() 
{
    // Let any listeners know
    ForEach(scrollCallbacks, function(item)
    {
        // Invoke callback
        item();
    });
}

// Called whenever the page first loads
function ProcessOnLoad() 
{
    // Let any listeners know
    ForEach(onLoadCallbacks, function(item)
    {
        // Invoke callback
        item();
    });
}


//
//   Show top menu expand when burger menu clicked
//
OnLoad(function()
{
    // Find all items with the attribute
    var menuExpanders = document.querySelectorAll("[href='#topmenu']");
    
    ForEach(menuExpanders, function(item) 
    {
        // For each element, listen for click
        item.addEventListener("click", function(e)
        {
            // Cancel navigation
            e.preventDefault();

            // Toggle the class on this anchor
            item.classList.toggle(item.getAttribute('data-toggle-class'));    

            // Toggle class on menu
            ForEach(document.querySelectorAll("[data-topmenu-class]"), function(menu)
            {
                // Toggle hamburger menu class
                menu.classList.toggle(menu.getAttribute('data-topmenu-class'));    
            });
        });    
    });
});

// Find any elements with a data-scrolldown-class='x' attribute
// and add the class 'x' specified to the element when page is scrolled past the top
OnLoad(function()
{
    // Find all items with the attribute
    var scrolldownItems = document.querySelectorAll("[data-scrolldown-class]");

    // Keep flag to fire as we scroll down and up
    var scrolledDown = false;

    // Listen out for page scrolls
    OnScroll(function()
    {
        // Get scroll top position
        var windowTop = ScrollPositionTop();

        // If we have not scrolled down 
        // and we are now scrolled down...
        if (!scrolledDown && windowTop > scrollDownDetectStart)
        {
            // Add the scrolled down class to the items
            ForEach(scrolldownItems, function(item)
            {
                item.classList.add(item.getAttribute("data-scrolldown-class"));
            });

            // Flag as scrolled down
            scrolledDown = true;
        }
        // Else if we scrolled back up...
        else if (scrolledDown && windowTop <= scrollDownDetectStart)
        {
            // Remove the scrolled down class from the items
            ForEach(scrolldownItems, function(item)
            {
                item.classList.remove(item.getAttribute("data-scrolldown-class"));
            });

            // Flag as scrolled up
            scrolledDown = false;
        }
    });
});

// 
//   Get's top scroll position of window
//
function ScrollPositionTop()
{
    return window.scrollY || window.scollTop || document.getElementsByTagName("html")[0].scrollTop; 
}

//
//   OnScroll Interval Caller
//

// The result for scroll callbacks
var scrollTimerCallbackId = null;

// Keep track of scrolling time so we don't fire loads of events while scrolling
var lastScrollTime = 0;

// Scroll time update interval
var scrollUpdateInterval = 100;

// Monitor for window scroll
window.addEventListener('scroll', function() 
{
    // If the last callback has been cleared (or it's the  first time)...
    if (!scrollTimerCallbackId) 
    {
        // If this is the first time
        if (lastScrollTime == 0) 
        {
            // Update last scroll time
            lastScrollTime = new Date().getTime();

            // Scroll now
            ProcessScroll();
        }

        // Either way, start a timeout to fire after the interval time
        scrollTimerCallbackId = setTimeout(function() 
        {
            // Once done, clear Id so next scroll will trigger another callback
            scrollTimerCallbackId = null;

            // Update last scroll time
            lastScrollTime = new Date().getTime();

            // Process scroll
            ProcessScroll();
            
        }, scrollUpdateInterval);
    }
});

// On load fire any listeners
document.addEventListener("DOMContentLoaded", function(event) 
{ 
    ProcessOnLoad();
});

