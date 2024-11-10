package main

import (
	"context"
	"fmt"
	"time"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetPlaylists() ([]Playlist, error) {
	return database.GetPlaylists()
}

func (a *App) GetChannels(playlistID int) ([]Channel, error) {
	return database.GetChannelsByPlaylistID(int64(playlistID))
}

// Добавление плейлиста из URL
func (a *App) AddPlaylistFromURL(url string, playlistName string) (int64, error) {

	// Парсинг содержимого
	channels, err := ParseM3UFromURL(url)
	if err != nil {
		return 0, fmt.Errorf("failed to parse playlist: %w", err)
	}

	// Сохранение плейлиста
	playlistID, err := database.AddPlaylist(playlistName, url)
	if err != nil {
		return 0, fmt.Errorf("failed to save playlist: %w", err)
	}

	// Сохранение каналов
	for _, channel := range channels {
		err = database.AddChannel(playlistID, channel.Name, channel.URL, channel.Category)
		if err != nil {
			return 0, fmt.Errorf("failed to save channel: %w", err)
		}
	}

	return playlistID, nil
}

// Добавление плейлиста из локального файла
func (a *App) AddPlaylistFromFile(fileContent []byte, playlistName string) (int64, error) {
	// 1. Парсинг содержимого файла
	channels, err := ParseM3UFromFile(fileContent)
	if err != nil {
		return 0, fmt.Errorf("failed to parse playlist: %w", err)
	}

	// 2. Сохранение плейлиста
	playlistID, err := database.AddPlaylist(playlistName, "local")
	if err != nil {
		return 0, fmt.Errorf("failed to save playlist: %w", err)
	}

	// 3. Сохранение каналов
	for _, channel := range channels {
		err = database.AddChannel(playlistID, channel.Name, channel.URL, channel.Category)
		if err != nil {
			return 0, fmt.Errorf("failed to save channel: %w", err)
		}
	}

	return playlistID, nil
}

// Метод удаления плейлиста для Wails
func (app *App) DeletePlaylist(playlistID int64) error {
	return database.DeletePlaylist(playlistID)
}

func (app *App) UpdatePlaylistChannels(playlistID int64) error {
	playlist, err := database.GetPlaylist(playlistID)
	if err != nil {
		return err
	}

	channels, err := ParseM3UFromURL(playlist.URL)
	if err != nil {
		return fmt.Errorf("failed to parse playlist: %w", err)
	}

	err = database.DeleteChannelsFromPlaylist(playlistID)
	if err != nil {
		return fmt.Errorf("failed to delete channels: %w", err)
	}

	// Сохранение каналов
	for _, channel := range channels {
		err = database.AddChannel(playlistID, channel.Name, channel.URL, channel.Category)
		if err != nil {
			return fmt.Errorf("failed to save channel: %w", err)
		}
	}

	err = database.UpdatePlaylist(playlistID, playlist.Name, playlist.URL, time.Now())
	if err != nil {
		return fmt.Errorf("failed to update playlist name: %w", err)
	}

	return nil

}
