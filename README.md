# Modul for Craft CMS
Website builder template skeleton for Craft CMS aimed primarily at creatives, designers, photographers and other visual thinkers who enjoys a nice and tidy grid structure, with the ability to tastefully break it.

Modul is built for Craft CMS, using the following dependencies, all of which are included in their current version as of writing this, and will be updated as they are updated:
- CSS
 - [Bootstrap 4 Alpha](https://v4-alpha.getbootstrap.com/)
- Craft CMS Plugins
 - [Craft Neo](https://github.com/benjamminf/craft-neo)
 - [Craft Relabel](https://github.com/benjamminf/craft-relabel)
 - [a&m nav](https://github.com/am-impact/amnav)
 - [LJ Dynamic Fields](https://github.com/lewisjenkins/craft-lj-dynamicfields)
 - [Redactor Extras](https://github.com/elliotlewis/Redactor-Extras)
 - [Spectrum FieldType](https://github.com/alecritson/craft-spectrum-fieldtype)
 - [The Architect](https://github.com/Pennebaker/craftcms-thearchitect)

## Example websites running Modul
- http://23d.one
- http://askrembla.com

---

## Installation
### Server side files
Download Craft CMS from https://craftcms.com/ and extract on your desktop. Place the `app` folder from within the `craft` folder into the `craft` folder inside this package and upload to your hosting platform/server.

#### Note
Don't upload modul-database.zip, and no need to upload the source files in `craft/templates/scss` just `modul.min.css`. And don't forget to include the `.htaccess` file in the root of this directory. I've included a `_htaccess` file just in case, that you can upload and rename (OSX and Linux hides files with a period in front).

### Database
When you're done uploading the files, don't forget to update the information in `craft/config/db.php` to match that of your database.
Once you're done uploading the files to your hosting, you need to access your MySQL database to import the included zipped sql file (`modul-database.zip`) (typically through your host's phpMyAdmin or a free app like [Sequel Pro](https://www.sequelpro.com/)).

### Logging in
The username is `admin` and the password is `password`.

#### Ps. Don't forget to set your url under Settings > General, and change your user information under Users > admin.

---

## Updating (This only works between certain releases, the latest does not support this yet).
If you've already installed a previous version, and don't want to lose any content, skip importing the database and follow these steps:
* Go `Settings > Plugins` and `Install` The Architect (if already installed, go to the next step).
* Go to `The Architext` go to the `Available Files`.
* Click on `update.json`.
* Scroll all the way down and click `Construct`
* Don't worry about errors and warnings, you should now be good to go with all the latest features.
* When you're done, you can go back to `Settings > Plugins` and `Uninstall` The Architect.
* Enjoy a beer.

#### Ps. You should skip uploading the `uploads` folder when updating.

---

## Quick tutorial
Start off by looking at the `Homepage` and `About` page. These are two very basic representations of what a page or post can look like. When you add things to the `Work structure`, things will not automatically show up somewhere, you have to create a page (look at the `Work` page in the `Pages structure`). If you decide to create more structures, you can then load them in like on the `Work` page (or any page/post). Keep in mind though, that in order for you to be able to add and render content, you need to add all the fields to that specific structure (look at the `Work` structure for guidance) or program your own version of that specific structure (or channel for that matter, if you want a news section or blog capabilities). Install, have a look around—and hopefully things will get a bit more clear.

---

For any other information, please refer to the [Craft CMS Documentation](https://craftcms.com/docs/introduction).

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
