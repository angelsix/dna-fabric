// Last scroll position
var lastScrollPosition = 0;

// Wait for page to load...
OnLoad(function()
{
    // Find any elements with attribute
    var items = document.querySelectorAll("[data-scroll-into-view]");
    
    // Every time the page scrolls...
    OnScroll(function()
    {
        // Get scroll position
        var windowTop = ScrollPositionY();

        // Keep track of if we are scrolled down or up
        var scrolledDown = windowTop > lastScrollPosition;

        // If we have scrolled down...
        if (scrolledDown)
        {
            // For each element...
            ForEach(items, function(item)
            {
                // If it already has class...
                if (item.classList.contains(item.getAttribute("data-scroll-into-view")))
                    // Ignore
                    return;

                // If user specifies a specific client height offset, use it
                var specificOffset = item.getAttribute("data-scroll-into-view-offset");

                // If the user hasn't specified an offset...
                if (!(specificOffset > 0))
                    // Set it to 30%
                    specificOffset = 30;

                // Get item bounds
                var itemBounds = item.getBoundingClientRect();

                // If the item has scrolled up past the percentage of the page in specified offset...
                if (itemBounds.top + (itemBounds.height * (specificOffset / 100)) < ViewportHeight())
                {
                    // Add the desired class
                    item.classList.add(item.getAttribute("data-scroll-into-view"));
                }
            });
        }
        // If scrolling up
        else 
        { 
            // For each element... 
            ForEach(items, function(item) 
            { 
                // If it doesn't have class... 
                if (!item.classList.contains(item.getAttribute("data-scroll-into-view"))) 
                    // Ignore 
                    return; 
 
                // Don't process unless we want to unload on scroll up 
                if (item.getAttribute("data-scroll-into-view-unload") == null) 
                   return; 
 
                // If user specifies specific client height offset, use that 
                var specificOffset = item.getAttribute("data-scroll-into-view-offset"); 
 
                // If the user hasn't specified an offset...
                if (!(specificOffset > 0))
                    // Set it to 30%
                    specificOffset = 30;

                // Get item bounds 
                var itemBounds = item.getBoundingClientRect(); 
 
                if (itemBounds.top + (itemBounds.height * (specificOffset / 100)) > ViewportHeight()) 
                { 
                    // Remove the desired class 
                    item.classList.remove(item.getAttribute("data-scroll-into-view"));                         
                } 
            });
        }
        
        // Save last scroll position
        lastScrollPosition = windowTop;
    });
});