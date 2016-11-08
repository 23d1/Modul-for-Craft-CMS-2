# Modul for Craft CMS
Website builder template skeleton for Craft CMS aimed primarily at (but not limited to) creatives, designers, photographers and other visual thinkers who enjoys a nice and tidy grid structure, with the ability to tastefully break it.

## Example websites running Modul
* http://23d.one
* http://askrembla.com
* http://studiosloan.com

---

## Installation
### Server side files
Download Craft CMS from https://craftcms.com/ and extract on your desktop. Place the `app` folder from within the `craft` folder into the `craft` folder inside this package and upload to your hosting platform/server.

#### Note
Don't upload modul-database.zip. And don't forget to include the `.htaccess` file in the root of this directory. I've included a `_htaccess` file just in case, that you can upload and rename (OSX and Linux hides files with a period in front).

### Database
When you're done uploading the files, don't forget to update the information in `craft/config/db.php` to match that of your database.
Once you're done uploading the files to your hosting, you need to access your MySQL database to import the included zipped sql file (`modul-database.zip`) (typically through your host's phpMyAdmin or a free app like [Sequel Pro](https://www.sequelpro.com/)).

### Logging in
The username is `admin` and the password is `password`.

#### Ps. Don't forget to set your url under Settings > General, and change your user information under Users > admin.

---

## Updating
Read the [UPDATE.md](https://github.com/23d1/Modul/blob/master/UPDATE.md) for information on updating Modul from 0.2.5 Alpha to 0.3.0 Alpha. Updates from prior versions require fresh install. This work-in-progress process will be simplified in future releases.

#### Ps. You should skip uploading the `uploads` folder when updating.

---

## Quick tutorial
Start off by looking at the `Homepage` and `About` page. These are two very basic representations of what a page or post can look like. When you add things to the `Work structure`, things will not automatically show up somewhere, you have to create a page (look at the `Work` page in the `Pages structure`). If you decide to create more structures, you can then load them in like on the `Work` page (or any page/post). Keep in mind though, that in order for you to be able to add and render content, you need to add all the fields to that specific structure (look at the `Work` structure for guidance) or program your own version of that specific structure (or channel for that matter, if you want a news section or blog capabilities). Install, have a look around—and hopefully things will get a bit more clear.

---

For any other information, please refer to the [Craft CMS Documentation](https://craftcms.com/docs/introduction).

---

## A brief summary of functionality
* **Fully fluid and responsive.**
* **Different block types can be added to rows of content.**
  * **Row** Either `Normal` or `Masonry` (using jQuery Packery to fill gaps in columns)
    * **Content**
      * Text
      * Image
      * Slideshow
      * Video
      * Video Loop (like an animated gif, but better)
      * Taxonomy (should rename this eventually, it's the ability to add a list with any individual entry, or multiple entries in any order and render as index, thumbs or full)
      * Structure (this loads a structure, like `Work` for example, and renders either as index, thumbs or full, with the ability to limit how many are shown)
    * **Utilities**
      * Spacer
      * Separator
      * Clear
      * Code
* **Singles > Homepage**
  * This is the landing page
  * Build landing page however you want
  * Style landing page however you want
* **Entries > Structures**
  * **Pages**
    * Add a page and build it however you want
    * Style the page however you want
  * **Work**
    * The difference between this structure and the `Pages` structure is that you have a `thumbnail` tab. This is so you can render thumbnails when loading the structure/taxonomy on other pages.
  * *If you add another structure, don't forget to set up the fields as they are set up in the `Work` structure. Just drag-and-drop to match.*
* **Globals**
  * **Footer**
    * Build your `Footer` in a similar fashion to how you build `Pages`
  * **Header** (coming soon)
    * The ability to render the header different ways.
      * Show menu items in header (responsively collapses to button)
      * Menu button as text or sandwich icon
  * **Menu**
    * Here you can add text content to the menu
  * **Site**
    * Settings that affect the whole site
      * Favicon
      * Page Loader
      * Google Analytics
      * Logo SVG code (not yet correctly implemented)
      * Colors
    * **Typography**
      * Add custom fonts
      * Change font sizes
      * Change line heights
* **Navigation**
  * Main Menu (renders larger links to the left in the menu)
    * Add links to any entry or url
  * Sub Menu (renders smaller links to the left in the menu, below the larger main menu items)
    * Add links to any entry or url

---

## Dependencies
Modul is built for Craft CMS, using the following dependencies, all of which are included in their current version as of writing this, and will be updated as they are updated:
* Craft CMS Plugins
  * [Craft Neo](https://github.com/benjamminf/craft-neo)
  * [Craft Relabel](https://github.com/benjamminf/craft-relabel)
  * [a&m nav](https://github.com/am-impact/amnav)
  * [LJ Dynamic Fields](https://github.com/lewisjenkins/craft-lj-dynamicfields)
  * [Redactor Extras](https://github.com/elliotlewis/Redactor-Extras)
  * [Spectrum FieldType](https://github.com/alecritson/craft-spectrum-fieldtype)
  * [The Architect](https://github.com/Pennebaker/craftcms-thearchitect)
* CSS
  * [Bootstrap 4 Alpha 5](https://v4-alpha.getbootstrap.com)
* JavaScript / jQuery 3.1.1
  * [lazysizes 2.0.6](https://github.com/aFarkas/lazysizes)
  * [jQuery Easing v1.3](http://gsgd.co.uk/sandbox/jquery/easing)
  * [Packery 2.1.1](http://packery.metafizzy.co)
  * [RoyalSlider 9.5.7](http://dimsemenov.com)
  * [smoothState.js](http://smoothstate.com)
  * [BackgroundCheck](http://kennethcachia.com/background-check)
  * [MediaElement.js](http://mediaelementjs.com)
  * [Waypoints](http://imakewebthings.com/waypoints)

---

## To-do and known issues
* Documentation of the back-end with front-end examples (way back on the back-burner).
* Slideshows with "visible nearby" and no max-height set gets too much vertical padding.
* CSS and Twig spaghetti needs cleaning up.
* Pasting SVG code for the logo in the `Globals/Site` doesn't work yet.
* Add more customization options to the backend.
* Slide text fields in Slideshows do nothing at the moment, but I have something built that needs a bit more work for the next release.
* Add cover style background video functionality.
* Add the front-end functionality for text content in slider blocks.
