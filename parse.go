// parse.go
package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"
)

// Общая функция для парсинга, которая принимает io.Reader
func parseM3U(reader io.Reader) ([]Channel, error) {
	var channels []Channel
	var currentChannel Channel
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line := scanner.Text()

		// Проверка на строку с информацией о канале
		if strings.HasPrefix(line, "#EXTINF") {
			re := regexp.MustCompile(`,(.*)`)
			match := re.FindStringSubmatch(line)
			if len(match) > 1 {
				currentChannel.Name = match[1]
			}

		} else if strings.HasPrefix(line, "#EXTGRP") {
			group := strings.TrimPrefix(line, "#EXTGRP:")
			currentChannel.Category = group

		} else if len(line) > 0 && !strings.HasPrefix(line, "#") {
			currentChannel.URL = line
			currentChannel.Favorite = false
			channels = append(channels, currentChannel)
			currentChannel = Channel{}
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return channels, nil
}

// Функция для парсинга из локального файла
func ParseM3UFromFile(fileContent []byte) ([]Channel, error) {
	reader := bytes.NewReader(fileContent)

	return parseM3U(reader)
}

// Функция для парсинга по URL
func ParseM3UFromURL(url string) ([]Channel, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch playlist: %s", resp.Status)
	}

	return parseM3U(resp.Body)
}
