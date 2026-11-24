# wedding-demo1

Royal Garden — an illustrated, animated wedding invitation.

Run `npm run dev` and visit http://localhost:8787. No package installation is required. Existing sibling projects are untouched.

Exactly seven fixed-screen scenes, navigated with Next/Back:
1. We're getting married — illustrated couple walking hand in hand.
2. Our story.
3. Schedule — all three events together, plus calendar download.
4. Dress code — animated men and women illustrations for Mehendi, Sangeet and wedding; accessible outfit tabs.
5. Travel & stay — full-canvas City Palace Jaipur photograph with realistic velvet curtain reveal, Google Maps link, arrival and stay notes.
6. Gifts — illustrated floating wish lantern: tap to release it into the sky with smaller lights, revealing a presence-over-presents message.
7. RSVP — a simple name and attendance form, saved only to browser localStorage.

This is a mock: Aarav & Meera, 20–21 February 2027, Jaipur. The palace image is an imaginary illustration; City Palace Jaipur is the sample map destination. No venue booking, transfers, accommodation, or hosted RSVP collection is arranged.

Native Web Animations, CSS and canvas power the motion. Reduced-motion preferences are supported. Google Fonts have local system fallbacks.

Files: index.html for content; scenes.js/scenes.css for fixed-screen navigation; chapters.js/chapters.css for dress code, curtains and gifts; motion.js/motion.css for the garden; app.js for envelope, local RSVP, audio and calendar. mobile.css and style.css provide shared styling.

Artwork uses the built-in image generation tool. Prompts and saved asset paths are in ARTWORK.md, ANIMATION-ARTWORK.md and DRESS-ARTWORK.md.

Validation: verify-chapters.mjs connects to an existing local headless Chrome debugging session on port 9229. It checks the seven scenes, outfit switches, curtain state, map target, gift reveal, RSVP saving, and viewport overflow.

Depth effects: depth.js/depth.css add replaying chapter entrances (botanical book doors, folding schedule rows, rotating fashion display, perspective destination stage, dimensional gift box, and hinged RSVP card). Pointer/touch movement supplies subtle tilt. A canvas renderer projects floating particles with z-depth. Entrance effects clean up when changing scenes and respect reduced motion. Navigation advances by tapping the scene; embedded controls retain their own actions.

Wish lantern artwork: assets/wish-lantern.png. Generated with the built-in image tool; full prompt in LANTERN-ARTWORK.md. wishes.css and the gift handler in chapters.js implement the lantern scene.

Destination: destination.css/destination.js compose the real photograph across the full scene with generated photorealistic emerald velvet curtains. The reveal replays on entry and through the Replay reveal control. Asset sources and the curtain prompt are in DESTINATION-ASSETS.md.

The latest Gifts scene features one large 3D-floating lantern. Tap to ignite it: the scene fills with warm light and particles, then reveals a short gift message. ignite.js and ignite.css implement the lighting experience. Local QA scripts and screenshots are intentionally excluded from the repository.

## Vercel deployment

The Git repository contains Royal Garden at its root. Use Root Directory `.`. vercel.json explicitly selects the Other framework preset, runs `npm run build`, and serves `dist/` as a static site. The build copies only the invitation HTML, its referenced scripts/styles and artwork. The local server.mjs is not a deployed function.
