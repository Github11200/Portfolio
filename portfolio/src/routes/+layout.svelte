<script lang="ts">
import "../app.css";
import { resolve } from "$app/paths";
import favicon from "$lib/assets/favicon.svg";
import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
import { Button } from "$lib/components/ui/button/index.js";

let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="absolute top-0 z-50 w-screen bg-background/90 backdrop-blur">
  <div class="mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8 mt-4">
    <NavigationMenu.Root>
      <NavigationMenu.List class="gap-8">
        <NavigationMenu.Item>
          <NavigationMenu.Link class="p-0">
            <Button variant="card" class="border-none h-auto p-0">
              <a href={resolve("/")} class="block rounded-(--radius) px-6 py-2 text-lg">Home</a>
            </Button>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link class="p-0">
            <Button variant="card" class="h-auto p-0 border-none">
              <a href={resolve("/blog")} class="block rounded-(--radius) px-6 py-2 text-lg">Blog</a>
            </Button>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link class="p-0">
            <Button variant="card" class="h-auto p-0 border-none">
              <a href={resolve("/projects")} class="block rounded-(--radius) px-6 py-2 text-lg">Projects</a>
            </Button>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>
</div>

<main class="min-h-[calc(100vh-(--spacing(16)))]">
  {@render children()}
</main>
