// Last scroll position
var lastScrollPosition = 0;

// Wait for page to load...
OnLoad(function()
{
    // Find any elements with attribute
    var items = document.querySelectorAll("[data-scroll-into-view]");

    ForEach(items, function(item)
    {
        item.classList.add("faded");
    });
    
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

                // If it is more than 25% in view...
                if (item.getBoundingClientRect().top < (ViewportHeight() * 0.75))
                {
                    // Add the desired class
                    item.classList.add(item.getAttribute("data-scroll-into-view"));
                }

                // TODO: Remove from list so doesn't process again
            });
        }

        // Save last scroll position
        lastScrollPosition = windowTop;
    });
});