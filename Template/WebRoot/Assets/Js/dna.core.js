// An array of callbacks for when the page is loaded
var onLoadCallbacks = [];

// Listen out for page content loaded event
document.addEventListener("DOMContentLoaded", function()
{
    // Process anything that should happen once the page is loaded
    ProcessOnLoad();
});

// Helper function to iterate over arrays
function ForEach(array, callback)
{
    // Loop each item...
    for (var i = 0; i < array.length; i++)
    {
        // Pass the item back to the function
        callback(array[i]);
    }
}

// Process any on load events
function ProcessOnLoad()
{
    // Call the callback
    ForEach(onLoadCallbacks, function(item)
    {
        // Invoke the callback
        item();
    });
}

// Called to add a function to be invoked once the page loads
function OnLoad(callback)
{
    // Add this callback to the list
    onLoadCallbacks.push(callback);
}
