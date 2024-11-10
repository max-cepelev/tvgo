/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const PlaylistsIndexLazyImport = createFileRoute('/playlists/')()
const PlaylistsFavoritesLazyImport = createFileRoute('/playlists/favorites')()
const PlaylistsPlaylistIdLazyImport = createFileRoute(
  '/playlists/$playlistId',
)()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PlaylistsIndexLazyRoute = PlaylistsIndexLazyImport.update({
  id: '/playlists/',
  path: '/playlists/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/playlists/index.lazy').then((d) => d.Route),
)

const PlaylistsFavoritesLazyRoute = PlaylistsFavoritesLazyImport.update({
  id: '/playlists/favorites',
  path: '/playlists/favorites',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/playlists/favorites.lazy').then((d) => d.Route),
)

const PlaylistsPlaylistIdLazyRoute = PlaylistsPlaylistIdLazyImport.update({
  id: '/playlists/$playlistId',
  path: '/playlists/$playlistId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/playlists/$playlistId.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/playlists/$playlistId': {
      id: '/playlists/$playlistId'
      path: '/playlists/$playlistId'
      fullPath: '/playlists/$playlistId'
      preLoaderRoute: typeof PlaylistsPlaylistIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/playlists/favorites': {
      id: '/playlists/favorites'
      path: '/playlists/favorites'
      fullPath: '/playlists/favorites'
      preLoaderRoute: typeof PlaylistsFavoritesLazyImport
      parentRoute: typeof rootRoute
    }
    '/playlists/': {
      id: '/playlists/'
      path: '/playlists'
      fullPath: '/playlists'
      preLoaderRoute: typeof PlaylistsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/playlists/$playlistId': typeof PlaylistsPlaylistIdLazyRoute
  '/playlists/favorites': typeof PlaylistsFavoritesLazyRoute
  '/playlists': typeof PlaylistsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/playlists/$playlistId': typeof PlaylistsPlaylistIdLazyRoute
  '/playlists/favorites': typeof PlaylistsFavoritesLazyRoute
  '/playlists': typeof PlaylistsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/playlists/$playlistId': typeof PlaylistsPlaylistIdLazyRoute
  '/playlists/favorites': typeof PlaylistsFavoritesLazyRoute
  '/playlists/': typeof PlaylistsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/playlists/$playlistId'
    | '/playlists/favorites'
    | '/playlists'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/playlists/$playlistId'
    | '/playlists/favorites'
    | '/playlists'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/playlists/$playlistId'
    | '/playlists/favorites'
    | '/playlists/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  PlaylistsPlaylistIdLazyRoute: typeof PlaylistsPlaylistIdLazyRoute
  PlaylistsFavoritesLazyRoute: typeof PlaylistsFavoritesLazyRoute
  PlaylistsIndexLazyRoute: typeof PlaylistsIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  PlaylistsPlaylistIdLazyRoute: PlaylistsPlaylistIdLazyRoute,
  PlaylistsFavoritesLazyRoute: PlaylistsFavoritesLazyRoute,
  PlaylistsIndexLazyRoute: PlaylistsIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/playlists/$playlistId",
        "/playlists/favorites",
        "/playlists/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/playlists/$playlistId": {
      "filePath": "playlists/$playlistId.lazy.tsx"
    },
    "/playlists/favorites": {
      "filePath": "playlists/favorites.lazy.tsx"
    },
    "/playlists/": {
      "filePath": "playlists/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */