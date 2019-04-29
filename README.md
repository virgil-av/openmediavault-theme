## OpenMediaVault plugin for theme switching

#### Forum post with step by step to install this plugin

https://forum.openmediavault.org/index.php/Thread/25807-OMV-Theme-plugin-theme-changer-and-UI-customisation/?postID=202337#post202337

#### A copy of the forum post

So the day has finally come to release this plugin.

Deb package details:

Package: openmediavault-theme
Version: 0.5.0
Maintainer: Virgil A.
Homepage: github.com/virgil-av/openmediavault-theme
Description: Plugin to change ui themes and ui manipulation

Download link: 
[Download deb file](https://github.com/virgil-av/openmediavault-theme/raw/deb/openmediavault-theme.deb)


Requirements:
1. OMV 4.x

How to install: 
1. Download above .deb file
2. Go to the plugin tab in OMV's web interface.
3. Upload the file.
4. Select the newly uploaded plugin openmediavault-theme
5. Click on Install. Refresh page.
6. If any repo errors after you upload just ignore that and click ok, it is the omv trying to update stuff nothing related to this plugin

![alt text](https://i.ibb.co/Cw9NbZL/Selection-074.png "Step 1 omv theme changer")
![alt text](https://i.ibb.co/mRCwBJ1/Selection-075.png "Step 2 omv theme changer")

Once you installed the plugin you should see the a new item in the left menu under the System called "Theme changer"


How to update: 

Option 1:
- download deb file that I post when I make and update
- upload deb file
- uninstall previous plugin
- install again
- Option 2:
- in the web ui click on "Theme changer" 
- than select the "Update" tab
- click on "Update now"

![alt text](https://i.ibb.co/ryBwdpR/Selection-076.png "update omv theme changer")

This is the current state of the available options

![alt text](https://i.ibb.co/pnwHtBM/Selection-077.png "how it looks omv theme changer")

Final notes
- plugin uses the already built theme changer tool
- you can still open the terminal version by calling "omv-theme"
- if you uninstall the omv-tool the plugin will not work any more
- you can do updates on the fly by just pressing the update button
- code is available on github, if you want to fork and create your own be my guest
- if you want new features make a request, preferably with specifics in mind
- if you built a theme and want it included in this tool just submit it to me
- if something breaks I take no responsibility, but I will try my best to fix the problem

