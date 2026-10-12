import pages from "../pages.js";

export function getPathMapping() {
  return pages.reduce((map, item) => {
    if (item.path && item.component) {
      map[item.path] = { name: item.name, title: item.title, description: item.description, component: item.component };
    } else if (item.folder) {
      item.folder.forEach((page) => {
        if (page.path && page.component) {
          map[page.path] = { name: page.name, title: page.title, description: page.description, component: page.component };
        }
      });
    }
    return map;
  }, {});
}
