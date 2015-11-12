<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

# svg2gcode4lasers
Create gCode for laserEngravers based on Grbl from svg files

## Goal
Create free software that enables DIY laser engraver builders to easily convert their images to gcode. This software must be open and online running inbrowser following the philosophy of other platforms like <a href="http://www.chilipeppr.com/grbl" target="_blank">chilipeppr</a>.  

## Concept
- [ ] upload svg images
- [ ] drag, scale and rotate the image
- [ ] select paths to cut, engrave or fill
- [ ] set fill angle, types
- [ ] set your machine cutting space
- [ ] set your laser feedrate
- [ ] set your laser power
- [ ] calibrate flow for your laser

## Technologie
- [ ] inBrowser application
- [ ] fabric.js to move scale rotate and select the svg
- [ ] svg conversions from 1.0, 1.1, 1.2 find different strategies for each version
- [x] own developed bezier curve class
- [ ] create gcode
