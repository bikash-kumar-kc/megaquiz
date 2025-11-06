import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#3B82F6" },
          600: { value: "#2563EB" },
        },
        accent: {
          500: { value: "#10B981" },
        },
      },
      fonts: {
        heading: { value: "Inter, sans-serif" },
        body: { value: "Roboto, sans-serif" },
      },
      radii: {
        full: { value: "9999px" },
        md: { value: "8px" },
      },
    },
  },
});

const mergedConfig = mergeConfigs(defaultConfig, customConfig);

const system = createSystem(mergedConfig);

export default system;
