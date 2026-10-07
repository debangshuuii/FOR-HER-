# Photos

Put her photos here as `photo1.jpg`, `photo2.jpg`, … (JPG or PNG).

Then update `config.js`:

```js
photos: [
  { src: "photos/photo1.jpg", alt: "...", compliment: "Your line here." },
  ...
]
```

Tips:
- Use 4:3 or square images, under ~500KB each for fast loading on phones.
- The card uses `object-fit: cover` inside a 4:3 frame, so nothing important near the edges gets awkwardly cut — keep faces centered.
- If a file is missing, the site shows a beautiful flower fallback instead of breaking.
- Current `.svg` files are just elegant placeholders so you can preview the flow before adding real photos — delete or replace them.

Compliment guidance: focus on personality, smile, kindness, humor, energy — not appearance/body.
