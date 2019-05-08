# Assumptions

1. The data of `launches` and `launchpads` are all valid. UI does not check validity.
2. Browser can always retrieve data from the server. No HTTP errors.

# Still to do

1. Properly format date and time of launch. I would use a 3rd party libraray, eg. moment, date-fns
2. Style `-` character before `Failed Mission` in black. As it requires additional markups and styles.
3. Format code to be less than e.g 100 characters a line.
4. Smooth animation of scrolling to top by CSS or easing function.
5. Style the arrow in the select box of launch pad, min year and max year.
6. Missing patch image is yet to be provided.
7. More CSS break points for mobile devices.

# Changes to the starter project

1. Changed that showing `site_name` instead of launch pad's full name in Launch Pad's dropdown, otherwise the dropdown would be too wide. The full name is captured in the `Subtitle` of each mission.
2. Added a pollyfill link for IE11.

