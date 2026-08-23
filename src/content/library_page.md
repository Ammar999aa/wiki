# Interactive Protein Payload Library Page

Create an interactive webpage based closely on the provided **“Our Protein Payload Library”** reference image.

The page should feel like a polished scientific product/library interface rather than a static infographic.

## Overall layout

At the top, include:

# OUR PROTEIN PAYLOAD LIBRARY

Subtitle:

_On-demand production. Modular. Versatile. For a better tomorrow._

Below the title, include a horizontal information bar with four sections:

- **Produced in Engineered Microbes**
  _S. cerevisiae, P. pastoris, B. subtilis_

- **Designed for Modularity & Safety**
  _Kill switches, Auxotrophy_

- **Versatile Delivery Platforms**
  _MOFs, Hydrogels, etc._

- **Applications in Health, Space, & Beyond**

Below this, create the main **protein library grid**.

## Protein cards

Display approximately 10 cards in a responsive grid, visually inspired by the reference image:

- Antifreeze Proteins (AFPs)
- HSV Nanobody
- PD-L1 Nanobody
- mCherry
- GFP
- Interleukin-10
- Insulin
- Follistatin
- Angiopoietin-1
- Custom Payloads

Each card should have:

- Protein name
- Short subtitle/type
- Protein illustration or placeholder molecular graphic
- Optional secondary icon
- “TESTED” badge where applicable
- 2–3 lines of short summary information
- Distinct accent color matching the reference image

The cards should look like scientific product tiles: rounded corners, subtle borders, clean backgrounds, and slight shadows.

## Main interaction

The important part is that **each protein card is clickable**.

When the user clicks a card:

1. That card becomes the **selected card**.
2. It should smoothly **enlarge and become visually dominant**.
3. The remaining cards should stay visible but become slightly smaller, dimmer, or less visually prominent.
4. Additional information about the selected protein should appear.

The transition should feel fluid and intentional, using animation rather than an abrupt layout change.

### Expanded card behavior

When expanded, the selected card should display substantially more information, such as:

- Full protein name
- Protein category/type
- Short description
- Mechanism / biological function
- Applications
- Why it is useful
- Expression status
- Host organism
- Delivery possibilities
- Relevant notes or validation information

For example, clicking **GFP** could expand it into something like:

**GFP — Green Fluorescent Protein**

Green fluorescent protein is a well-characterized fluorescent reporter widely used for visualization and proof-of-concept experiments.

**Function**
Produces green fluorescence when excited by appropriate wavelengths.

**Applications**

- Imaging
- Expression tracking
- Reporter assays
- Proof-of-concept validation

**Platform status**
Successfully expressed and validated in the platform.

The expanded information can either appear **inside the enlarged card** or in an attached detail panel that visually feels like an extension of that card.

## Interaction details

- Only one protein should be expanded at a time.
- Clicking another protein smoothly transitions the expanded state to that protein.
- Clicking the currently selected card again, or clicking a close/back control, should return the grid to its normal state.
- Add hover effects to indicate that cards are interactive.
- Use subtle scale, elevation, border, and glow changes rather than aggressive animations.
- Preserve the visual identity/color of each protein when expanded.
- On mobile, instead of dramatically reshaping the grid, the selected card can expand vertically or open into a full-width detail section.

## Bottom section

Below the library, recreate the workflow:

**FROM DESIGN TO DELIVERY**

Design → Clone → Express → Purify → Deliver → Make an Impact

Below that, include:

_One platform. Many payloads. Limitless impact._

Also include a small legend explaining:

**✓ TESTED:** Successfully expressed and validated in our platform.

## Visual direction

Use the supplied image as the main visual reference.

The page should feel:

- Scientific
- Modern
- Premium
- Clean
- Slightly futuristic
- Appropriate for a synthetic biology / biotechnology team

Use a dark navy page background with lighter white/gray card surfaces, subtle gradients, restrained shadows, and strong accent colors for individual protein categories.

Avoid making it look like a generic SaaS dashboard.

The main visual focus should remain the **protein library itself**.

## Technical implementation

Build the protein data from a reusable data structure rather than hard-coding each card separately.

For example, each protein object can contain:

- `id`
- `name`
- `subtitle`
- `color`
- `tested`
- `shortDescription`
- `function`
- `applications`
- `host`
- `delivery`
- `status`
- `image`

Use this data to populate both the collapsed and expanded versions.

Make the interaction reusable so additional protein payloads can easily be added later without redesigning the page.

The result should essentially feel like the original infographic has been transformed into an **interactive protein catalog**, where the user can explore each payload by clicking on it.
