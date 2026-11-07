import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import settings from "../site-settings";

const avatars = import.meta.glob<ImageMetadata>(
  "../assets/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);
const avatar = avatars[settings.author.avatar.replace(/^src\//, "../")];
if (!avatar) {
  throw new Error(`Avatar not found: ${settings.author.avatar}`);
}

export type Avatar = { src: string; srcset: string };

// Pages CMS stores the selected source path in author.avatar.
export async function getAvatar(size: number): Promise<Avatar> {
  const [normal, retina] = await Promise.all(
    [1, 2].map((density) =>
      getImage({
        src: avatar,
        width: size * density,
        height: size * density,
        format: "webp",
      }),
    ),
  );
  return { src: normal.src, srcset: `${normal.src} 1x, ${retina.src} 2x` };
}

// JPEG keeps the social preview compatible with every platform.
export async function getShareImage() {
  const image = await getImage({ src: avatar, width: 460, format: "jpg" });
  return image.src;
}
