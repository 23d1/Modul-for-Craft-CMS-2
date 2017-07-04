# Changes in 0.5.1 Beta
* New features
    * Added more typography options under `Globals > Typography`
* TODO for next update
    * Slideshows with "visible nearby" and no max-height set gets too much vertical padding.
    * Pasting SVG code for the logo in the `Globals/Site` doesn't work yet. Will likely be a different approach.
    * Add more customization options to the backend, like gutter widths and so forth.
    * Slide text fields in Slideshows do nothing at the moment, but I have something built that needs a bit more work for the next release.
    * Make full render taxonomy/structure items page styling carry through.
    * Make menu toggle off enforceable on mobile devices.
    * Add ability to inherit page/post styling from another entry.

# Changes in 0.5.0 Beta
#### This release requires a fresh install as there has been some major backend overhaul.
* Major update to features, templates, CSS and JS as well as bug fixes all over.
* New features
    * A new `Thumbnail` block that you can place anywhere and override settings for, like image/video/grid/offset/bleed etc. You can even override the thumbnail settings found in `Globals`.
    * Rows can now have background images, with loads of useful settings.
    * Added functionality to have overlay content on images, slideshows and videos. This content can be text, images, videos, video loops and so forth. It functions just like the standard page building blocks with rows and content blocks.

# Changes in 0.4.4 Alpha
* Major CSS and JS bug fixes as well as template cleanup
* Added video loop functionality to slideshows

# Changes in 0.4.0 Alpha from 0.3.0 Alpha
* Added a `Thumbnails` section under `Globals` where you can modify how thumbnails are displayed.
* Added a `Interface` section under `Globals` where you can activate sliding of objects as they enter the viewport. This section will have a lot more in future releases.

# Changes in 0.3.0 Alpha from 0.2.5 Alpha
* Completely revamped the image preloading to a lazy load hybrid which should greatly increase the page load speeds.
* Added functionality to autohide the header when it's set to fixed.
