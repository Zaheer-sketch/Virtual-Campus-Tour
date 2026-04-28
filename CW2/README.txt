LSBU Virtual Tour - Final Recorded Sites and Route Version

Put your logo file in this folder as:
lsbu-logo.png

Replace the placeholder media inside /media with your final files using the same filenames:
- students-union.jpg / students-union.mp4
- grads-cafe.jpg / grads-cafe.mp4
- westminster-lecture-theatre.jpg / westminster-lecture-theatre.mp4
- exhibition-space.jpg / exhibition-space.mp4
- library-entrance-to-support-desk.jpg / library-entrance-to-support-desk.mp4

Tripod-recorded locations:
- Students Union
- Grads Cafe
- Westminster Lecture Theatre
- Exhibition Space

Robot route:
- Library Entrance to Support Desk

Run locally with:
python3 -m http.server 3000
Then open:
http://localhost:3000/index.html


Mobile/browser compatibility update:
- Added phone-browser responsive layout refinements.
- Added viewport safe-area support.
- Added muted inline video playback handling for mobile browsers.
- Desktop/localhost layout and structure kept unchanged.
