# Animated garden artwork

Both assets were generated with the built-in image generation tool and saved in this project.

## assets/couple-walk.png

Use case: illustration-story. Asset type: transparent sprite sheet for a luxury Indian wedding animated invitation. Create one wide horizontal sprite strip containing exactly FOUR equally sized cells in a single row, each cell showing the SAME full-body young Indian bride and groom walking together holding hands, viewed from a flattering three-quarter side view facing toward the RIGHT. Each frame the couple occupies the same consistent centered position and same scale with feet aligned on same baseline, separated from adjacent cells with transparent spacing. Four successive walking poses: contact, down, passing, up. Groom on left wears ivory embroidered sherwani, muted sage stole, brown mojari shoes; bride on right wears dusty rose lehenga with antique gold embroidery and sheer dupatta, long dark hair, gold jewelry. Their inner hands must be visibly joined in all four frames. Beautiful detailed hand-painted gouache watercolor cutout clipart, warm romantic Indian miniature painting aesthetics, delicate faces, elegant adult proportions. Both figures fully visible head to toe in every frame, no background, no landscape, no text, no grid lines. True transparent background. Keep identities outfits and heights consistent across frames. Exactly four frames in one horizontal row.

## assets/garden-flowers.png

Use case: illustration-story. Asset type: luxury wedding invitation transparent floral foreground clipart. One lush elegantly sweeping botanical branch, curved from lower left rising toward upper right, composed of soft blush garden roses, small ivory jasmine flowers, dusty pink bougainvillea, sage green slender leaves and fine antique gold stems. Exquisite hand-painted gouache botanical illustration, Indian heritage stationery aesthetic, highly detailed layered petals, airy delicate natural asymmetry. All flowers fully inside canvas with generous transparent margin. No vase, no text, no border, no paper, truly transparent background. Wide landscape composition.

## Motion

motion.js uses the native Web Animations API for the four-frame walking sequence, couple movement, botanical sways, butterfly flight, light breathing, and chapter entrances. Canvas renders floating light and touch-triggered petals. CSS animates butterfly wings. Animations pause outside the garden viewport and respect reduced-motion preferences. No external animation runtime is required.
