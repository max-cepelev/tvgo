package main

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type Playlist struct {
	ID        int64  `json:"id"`
	Name      string `json:"name"`
	URL       string `json:"url"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

type Channel struct {
	ID         int    "json:\"id\""
	Name       string "json:\"name\""
	URL        string "json:\"url\""
	Category   string "json:\"category\""
	Favorite   bool   "json:\"favorite\""
	PlaylistID int    "json:\"playlistId\""
}

type Database struct {
	DB *sql.DB
}

func NewDatabase(db *sql.DB) *Database {
	return &Database{DB: db}
}

// createTables создает таблицы playlists и channels, если они не существуют
func createTables(db *sql.DB) error {
	createPlaylistsTable := `
	CREATE TABLE IF NOT EXISTS playlists (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		url TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	createChannelsTable := `
	CREATE TABLE IF NOT EXISTS channels (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		playlist_id INTEGER,
		name TEXT,
		category TEXT,
		url TEXT,
		favorite BOOLEAN DEFAULT false,
		FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE
	);`

	// Выполним запросы для создания таблиц
	if _, err := db.Exec(createPlaylistsTable); err != nil {
		return fmt.Errorf("ошибка при создании таблицы playlists: %w", err)
	}

	if _, err := db.Exec(createChannelsTable); err != nil {
		return fmt.Errorf("ошибка при создании таблицы channels: %w", err)
	}

	return nil
}

// initDatabase устанавливает соединение и создает таблицы, если их нет
func initDatabase(dbPath string) (*Database, error) {
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, fmt.Errorf("ошибка при подключении к базе данных: %w", err)
	}

	// Проверим соединение с базой данных
	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("не удалось установить соединение с базой данных: %w", err)
	}

	// Создание таблиц, если они не существуют
	if err := createTables(db); err != nil {
		return nil, fmt.Errorf("ошибка при создании таблиц: %w", err)
	}

	return NewDatabase(db), nil
}

func (db *Database) AddToFavorites(channelID int) error {
	_, err := db.DB.Exec("UPDATE channels SET favorite = ? WHERE id = ?", true, channelID)
	return err
}

func (db *Database) RemoveFromFavorites(channelID int) error {
	_, err := db.DB.Exec("UPDATE channels SET favorite = ? WHERE id = ?", false, channelID)
	return err
}

func (db *Database) GetFavorites() ([]Channel, error) {
	rows, err := db.DB.Query("SELECT id, name, url, category FROM channels WHERE favorite = ?", true)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var channels []Channel
	for rows.Next() {
		var channel Channel
		if err := rows.Scan(&channel.ID, &channel.Name, &channel.URL, &channel.Category); err != nil {
			return nil, err
		}
		channels = append(channels, channel)
	}
	return channels, nil
}

// Получение списка всех плейлистов
func (db *Database) GetPlaylists() ([]Playlist, error) {
	query := "SELECT id, name, url FROM playlists"
	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var playlists []Playlist
	for rows.Next() {
		var playlist Playlist
		if err := rows.Scan(&playlist.ID, &playlist.Name, &playlist.URL); err != nil {
			return nil, err
		}
		playlists = append(playlists, playlist)
	}

	return playlists, nil
}

func (db *Database) GetPlaylist(playlistID int64) (Playlist, error) {
	query := "SELECT id, name, url FROM playlists WHERE id = ?"
	var playlist Playlist
	if err := db.DB.QueryRow(query, playlistID).Scan(&playlist.ID, &playlist.Name, &playlist.URL); err != nil {
		return Playlist{}, err
	}
	return playlist, nil
}

func (db *Database) UpdatePlaylist(playlistID int64, name string, url string, UpdatedAt time.Time) error {
	_, err := db.DB.Exec("UPDATE playlists SET name = ?, url = ?, updated_at = ? WHERE id = ?", name, url, UpdatedAt, playlistID)
	return err
}

// Получение списка каналов по playlist_id
func (db *Database) GetChannelsByPlaylistID(playlistID int64) ([]Channel, error) {
	query := "SELECT id, playlist_id, name, category, url FROM channels WHERE playlist_id = ? ORDER BY name ASC"
	rows, err := db.DB.Query(query, playlistID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var channels []Channel
	for rows.Next() {
		var channel Channel
		if err := rows.Scan(&channel.ID, &channel.PlaylistID, &channel.Name, &channel.Category, &channel.URL); err != nil {
			return nil, err
		}
		channels = append(channels, channel)
	}

	return channels, nil
}

func (db *Database) GetChannelsGroupedByCategory(playlistID int64) (map[string][]Channel, error) {
	query := "SELECT id, playlist_id, name, category, url FROM channels WHERE playlist_id = ? ORDER BY category ASC, name ASC"
	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	channelsByCategory := make(map[string][]Channel)
	for rows.Next() {
		var channel Channel
		if err := rows.Scan(&channel.ID, &channel.PlaylistID, &channel.Name, &channel.Category, &channel.URL); err != nil {
			return nil, err
		}
		channelsByCategory[channel.Category] = append(channelsByCategory[channel.Category], channel)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return channelsByCategory, nil
}

func (db *Database) AddPlaylist(name, url string) (int64, error) {
	query := `INSERT INTO playlists (name, url, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
	result, err := db.DB.Exec(query, name, url)
	if err != nil {
		return 0, fmt.Errorf("ошибка при добавлении плейлиста: %v", err)
	}
	return result.LastInsertId()
}

func (db *Database) AddChannel(playlistID int64, name string, url string, category string) error {
	_, err := db.DB.Exec("INSERT INTO channels (playlist_id, name, url, category) VALUES (?, ?, ?, ?)", playlistID, name, url, category)
	return err
}

func (db *Database) DeletePlaylist(playlistID int64) error {
	// Начнем транзакцию, чтобы гарантировать удаление как плейлиста, так и каналов
	tx, err := db.DB.Begin()
	if err != nil {
		return fmt.Errorf("не удалось начать транзакцию: %v", err)
	}

	// Удаляем сначала каналы, связанные с этим плейлистом
	_, err = tx.Exec("DELETE FROM channels WHERE playlist_id = ?", playlistID)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("не удалось удалить каналы для плейлиста: %v", err)
	}

	// Удаляем сам плейлист
	_, err = tx.Exec("DELETE FROM playlists WHERE id = ?", playlistID)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("не удалось удалить плейлист: %v", err)
	}

	// Завершаем транзакцию
	err = tx.Commit()
	if err != nil {
		return fmt.Errorf("не удалось завершить транзакцию: %v", err)
	}

	return nil
}

func (db *Database) DeleteChannelsFromPlaylist(playlistID int64) error {
	_, err := db.DB.Exec("DELETE FROM channels WHERE playlist_id = ?", playlistID)
	return err
}
