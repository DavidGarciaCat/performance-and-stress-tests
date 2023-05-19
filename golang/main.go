package main

import (
	"encoding/json"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Create a sample data structure
		data := struct {
            Server string `json:"server"`
            Hello  string `json:"hello"`
        }{
            Server: "golang",
            Hello:  "world",
        }

		// Convert the data to JSON
		jsonData, err := json.Marshal(data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Set the appropriate headers
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		// Write the JSON response
		w.Write(jsonData)
	})

	http.HandleFunc("/loop", func(w http.ResponseWriter, r *http.Request) {
		// Create a sample data structure
		data := struct {
			Message string `json:"message"`
		}{
			Message: "Hello, World!",
		}

		// Convert the data to JSON
		jsonData, err := json.Marshal(data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Set the appropriate headers
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		// Write the JSON response
		w.Write(jsonData)
	})

	// Start the HTTP server
	http.ListenAndServe(":8005", nil)
}
