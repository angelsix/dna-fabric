# DNA Fabric

A web template for the modern age, made with [DnaWeb](www.dnaweb.io), Sass and [Live Data](https://github.com/angelsix/dna-web/tree/develop/Source/Dna.Web.Core/LiveData/Source)

This template includes:

- Normalization
- Color Theming Support
- Variable Base Size System
- Responsive Grid and Layout System
- Live Data Source (for installing Fabric templates and using Live Variables for rapid prototyping)

## Getting Started

First make sure you have [DnaWeb](http://www.dnaweb.io) installed. Create a new folder, type `dnaweb` into the address bar to start up DnaWeb in there.

In the command window, type `live sources` and make sure `DnaFabric` is in there (the Source link is included by default in DnaWeb since version `1.0.1.6`). If it does not show, create a **dna.config** file in your project folder and add it:

```
{ "liveDataSources": [ { "source": "https://raw.githubusercontent.com/angelsix/dna-fabric/master/LiveData/Fabric/dna.live.config" } ] }
```

Then type into the command window `live update` to refresh the Live Data Sources, and now `DnaFabric` should show when you type `live sources`

## Adding New Fabric Template

In your blank project folder, to add the Fabric template, from the DnaWeb command window type:

`new template fabric` 

Then press enter to use the current folder. Your project folder should now contain the Fabric template and folders,  the dna.config file and all that is needed to start creating a website with the Fabric template already built in and ready to use.

## Testing Grid System

Inside your project folder you should now have a **Source** folder and in there the **Html** folder that contains a **index.dhtml** file. Open that and that is your home page that automatically opens when you start DnaWeb.

Edit the **index.dhtml** file while DnaWeb is running and the edits will automatically get detected and the page will refresh in your browser.

The **index.dhtml** file will already have an include to the Fabric sample grid file so you can look at the output **.html** file in the **WebRoot** folder to see how to use the grid and what it can do.

To inject HTML directly and live into one of your **.dhtml** files for rapid development as you type, take a look at the available **Fabric Live Variables** available by typing `live variables` into the DnaWeb command window, and all that start with **fabric.** are available.

For more information on using Live Data Sources with Variables and Templates check out the [GitHub source](https://github.com/angelsix/dna-web/tree/develop/Source/Dna.Web.Core/LiveData/Source)