# Modul for Craft CMS
Website Builder Skeleton Template for Craft CMS aimed primarily at creatives, designers, photographers and other visual thinkers who enjoys a nice and tidy grid structure, with the ability to tastefully break it.

Modul is built for Craft CMS, using the following dependencies, all of which are included in their current version as of writing this, and will be updated as they are updated:
- CSS
 - [Bootstrap 4 Alpha](https://v4-alpha.getbootstrap.com/)
- Craft CMS Plugins
 - [Craft Neo](https://github.com/benjamminf/craft-neo)
 - [a&m nav](https://github.com/am-impact/amnav)
 - [LJ Dynamic Fields](https://github.com/lewisjenkins/craft-lj-dynamicfields)
 - [Redactor Extras](https://github.com/elliotlewis/Redactor-Extras)
 - [Spectrum FieldType](https://github.com/alecritson/craft-spectrum-fieldtype)

## Example websites running Modul
- http://23d.one
- http://askrembla.com

---

## Installation
### Server side files
* #### The simple way
Download Craft CMS from https://craftcms.com/ and extract on your desktop. Place the "app" folder from withing the `craft` folder into the `craft` folder inside this package and upload to your hosting platform/server.

* #### The Craft way
You need to get Craft CMS and install on your hosting platform/server. You can download it at https://craftcms.com/ and follow the instructions for that at https://craftcms.com/docs/installing. Download this repository and replace the corresponding folders inside the `craft` folder with the stuff in the `craft` folder from this repository. Everything outside of the `craft` folder goes in the `public` folder.

Don't upload modul-database.zip, and no need to upload the source files in `craft/templates/scss` just `modul.min.css`. And don't forget to include the `.htaccess` file in the root of this directory. I've included a `_htaccess` file just in case, that you can upload and rename (OSX and Linux hides files with a period in front).

### Database
When you're done uploading the files, don't forget to update the information in `craft/config/db.php` to match that of your database.
Once you're done uploading the files to your hosting, you need to access your MySQL database to import the included zipped sql file (`modul-database.zip`) (typically through your host's phpMyAdmin or a free app like [Sequel Pro](https://www.sequelpro.com/)).

### Logging in
The username is `admin` and the password is `password`.

#### Ps. Don't forget to set your url under Settings > General, and change your user information under Users > admin.

---

## Quick Tutorial
Start off by looking at the `Homepage` and `About` page. These are two very basic representations of what a page or post can look like. When you add things to the `Work structure`, things will not automatically show up somewhere, you have to create a page (look at the `Work` page in the `Pages structure`). If you decide to create more structures, you can then load them in like on the `Work` page (or any page/post). Keep in mind though, that in order for you to be able to add and render content, you need to add all the fields to that specific structure (look at the `Work` structure for guidance) or program your own version of that specific structure (or channel for that matter, if you want a news section or blog capabilities). Install, have a look around—and hopefully things will get a bit more clear.

---

For any other information, please refer to the [Craft CMS Documentation](https://craftcms.com/docs/introduction).

---

## Todo and known issues
* Documentation of the back-end with front-end examples (way back on the back-burner).
* Slideshows with "visible nearby" and no max-height set gets too much padding.
* Various minor CSS/JS related issues for cross device support.
* Pasting SVG code for the logo in the Globals / Site doesn't work yet.
* Add more customization options to the backend.
* Next/Prev only works for work section. Will make it work for all structures except "pages".
* Slide text fields in Slideshows do nothing at the moment, but I have something built that needs a bit more work for the next release.
