# Note about Modul 2—or rather—Modul 1.0 for Craft 3 on Nov 28, 2018

I've been working on Modul 1.0 for Craft 3, but a crucial plugin (Neo) has gone commercial with a $49/year fee. This is not in line with my ideals for open source, and so until Pixel & Tonic allows an agency/developer license where I pay a fee, but can distribute freely this project will be put on hold.
If there's enough interest, I will use SuperTable instead, which has similar functionality, but a lot less elegant in my opinion. Let me know, and I will seriously consider it.

# Modul for Craft CMS

Website builder template skeleton for Craft CMS aimed primarily at (but not limited to) creatives, designers, photographers and other visual thinkers who enjoys a nice and tidy grid structure, with the ability to tastefully break it.

## Example websites running Modul

- <http://23d.one>
- <http://askrembla.com>
- <http://studiosloan.com>
- <http://tombiskup.com>

--------------------------------------------------------------------------------

## Installation

### Server side files

Download Craft CMS from <https://craftcms.com/> and extract on your desktop. Place the `app` folder from within the `craft` folder into the `craft` folder inside this package and upload to your hosting platform/server.

#### Note

Don't upload modul-database.zip. And don't forget to include the `.htaccess` file in the root of this directory. I've included a `_htaccess` file just in case, that you can upload and rename (OSX and Linux hides files with a period in front).

### Database

When you're done uploading the files, don't forget to update the information in `craft/config/db.php` to match that of your database. Once you're done uploading the files to your hosting, you need to access your MySQL database to import the included zipped sql file (`modul-database.zip`) (typically through your host's phpMyAdmin or a free app like [Sequel Pro](https://www.sequelpro.com/)).

### Logging in

The username is `admin` and the password is `password`.

#### Ps. Don't forget to set your url under Settings > General, and change your user information under Users > admin.

--------------------------------------------------------------------------------

## Quick tutorial

Start off by looking at the `Entries > Singles > Home` and `Entries > Pages > About` page. These are two very basic representations of what a page or post can look like. When you add things to the `Entries > Work` structure, things will not automatically show up somewhere, you have to create a page (look at the `Entries >  Pages > Work` page in the `Pages` structure). If you decide to create more structures, you can then load them in like on the `Work` page (or any page/post). Keep in mind though, that in order for you to be able to add and render content, you need to add all the fields to that specific structure (look at the `Work` structure for guidance) or program your own version of that specific structure (or channel for that matter, if you want a news section or blog capabilities). Install, have a look around--and hopefully things will get a bit more clear.

**Please see the `Help` section in the sidebar for further information and basic tutorials.**

--------------------------------------------------------------------------------

For any other information, please refer to the [Craft CMS Documentation](https://craftcms.com/docs/introduction).

--------------------------------------------------------------------------------

## A brief summary of functionality

- **Fully fluid and responsive.**
- **Different block types can be added to rows of content.**

  - **Row** Either `Normal` or `Masonry` (using jQuery Packery to fill gaps in columns)

    - **Content**

      - Text
      - Image
      - Slideshow
      - Video
      - Video Loop (like an animated gif, but better)
      - Thumbnail (override thumbnail specific settings, and treat it more as an image)
      - Taxonomy (should rename this eventually, it's the ability to add a list with any individual entry, or multiple entries in any order and render as index, thumbs or full)
      - Structure (this loads a structure, like `Work` for example, and renders either as index, thumbs or full, with the ability to limit how many are shown)
      - Channel (this loads a channel, like `news` for example, and renders the entries as a blog)
      - You can add overlay content on images, slideshows, videos and video loops. It functions the same as the rows/blocks when building pages.

    - **Utilities**

      - Spacer
      - Separator
      - Clear
      - Code

- **Singles > Homepage**

  - This is the landing page
  - Build landing page however you want
  - Style landing page however you want

- **Entries > Structures**

  - **Pages**

    - Add a page and build it however you want
    - Style the page however you want

  - **Work**

    - The difference between this structure and the `Pages` structure is that you have a `thumbnail` tab. This is so you can render thumbnails when loading the structure/taxonomy on other pages.

  - _If you add another structure, don't forget to set up the fields as they are set up in the `Work` structure. Just drag-and-drop to match._

- **Entries > Channels**

  - **News**

    - This is sort of like a blog structure.

    - _If you add another channel, don't forget to set up the fields as they are set up in the `Work` structure. Just drag-and-drop to match._

- **Globals**

  - **Footer**

    - Build your `Footer` in a similar fashion to how you build `Pages`

  - **Header and Menu**

    - Set the navigation type.

      - Show menu items in header (responsively collapses to button)
      - Menu button as text or sandwich icon

    - Add entries to the menu(s)

    - Add menu content (for the slide-out menu)
    - Set styles (for the slide-out menu)

  - **Interface**

    - Set some sitewide settings like page loader and so forth.

  - **Layout**

    - Tweak site-wide layout settings and styles.

  - **Site**

    - Settings that affect the whole site
    - Favicon
    - Description
    - Google Analytics

  - **Thumbnails**

    - Settings and styles for thumbnails (when rendering a structure as a grid--like the work section for example)

  - **Typography**

    - Add custom fonts
    - Change font sizes
    - Change line heights

--------------------------------------------------------------------------------

## Dependencies

Modul is built for Craft CMS, using the following dependencies, all of which are included in their current version as of writing this, and will be updated as they are updated:

- Craft CMS Plugins

  - [Craft Neo](https://github.com/benjamminf/craft-neo)
  - [Craft Relabel](https://github.com/benjamminf/craft-relabel)
  - [a&m nav](https://github.com/am-impact/amnav)
  - [LJ Dynamic Fields](https://github.com/lewisjenkins/craft-lj-dynamicfields)
  - [Redactor Extras](https://github.com/elliotlewis/Redactor-Extras)
  - [Spectrum FieldType](https://github.com/alecritson/craft-spectrum-fieldtype)
  - [The Architect](https://github.com/Pennebaker/craftcms-thearchitect)
  - [Craft Help](https://github.com/70kft/craft-help)

- CSS

  - [Bootstrap 4 Alpha 5](https://v4-alpha.getbootstrap.com)

- JavaScript / jQuery 3.1.1

  - [lazysizes 4.0.0rc1](https://github.com/aFarkas/lazysizes)
  - [jQuery Easing v1.3](http://gsgd.co.uk/sandbox/jquery/easing)
  - [Packery 2.1.1](http://packery.metafizzy.co)
  - [RoyalSlider 9.5.7](http://dimsemenov.com)
  - [smoothState.js](http://smoothstate.com)
  - [BackgroundCheck](http://kennethcachia.com/background-check)
  - [MediaElement.js](http://mediaelementjs.com)
  - [Waypoints](http://imakewebthings.com/waypoints)

--------------------------------------------------------------------------------

## To-do and known issues

- Slideshows with "visible nearby" and no max-height set gets too much vertical padding.
- Add more customization options to the backend, like max-width on/off and max-width value.
- Slide text fields in Slideshows do nothing at the moment, but I have something built that needs a bit more work for the next release.
- Make full render taxonomy/structure items page styling carry through.
- Make menu toggle off enforceable on mobile devices.
