<script lang="ts">
import "../app.css";
import { resolve } from "$app/paths";
import favicon from "$lib/assets/favicon.svg";
import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";

let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="sticky top-0 z-50 w-screen bg-background/90 backdrop-blur">
  <div class="mx-auto flex w-full max-w-6xl items-center px-4 py-3 sm:px-6 lg:px-8">
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link>
            <a href={resolve("/")} class="px-4 text-lg">Home</a>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link>
            <a href={resolve("/blog")} class="px-4 text-lg">Blog</a>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link>
            <a href={resolve("/projects")} class="px-4 text-lg">Projects</a>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
</div>

<main class="min-h-[calc(100vh-theme(spacing.16))]">
  {@render children()}
</main>
