# Changes in 0.4.0 Alpha from 0.3.0 Alpha
* Added a `Thumbnails` section under `Globals` where you can modify how thumnails are displayed.
* Added a `Interface` section under `Globals` where you can activate sliding of objects as they enter the viewport. This section will have a lot more in future releases.

# Changes in 0.3.0 Alpha from 0.2.5 Alpha
* Completely revamped the image preloading to a lazy load hybrid which should greatly increase the page load speeds.
* Added functionality to autohide the header when it's set to fixed.

# Updating
## Updating from 0.2.5 Alpha or 0.3.0 Alpha to 0.4.0 Alpha
1. Replace the templates folder on your ftp with the one in this package (`craft/templates`).
2. Replace the `thearchitect` folder in `/craft/config/`
3. Replace the js folder on your ftp with the one in this package.
4. Go to your admin and log in. Then go to `Settings > Plugins` and `Install` The Architect.
5. Go to `The Architect` and then the `Available Files` tab.
6. Click on `construct.json` then click the `Construct` button at the very bottom of the page.
7. You can ignore all/any errors, it's just a safety measure for fields that are already in the system.
8. Go to `Settings > Plugins` and `Uninstall` The Architect.
9. Have another beer, you can now modify more aspects of Modul.
