package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"os"
	"sync"
	"time"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please specify a command to run:")
		fmt.Println("  go run main.go file    - Run the File Append, Read, and Pipe demo (write.js equivalent)")
		fmt.Println("  go run main.go async   - Run the Async Chaining & Delay demo (stream.js promises)")
		fmt.Println("  go run main.go server  - Start the SSE Streaming HTTP Server (stream.js Express)")
		return
	}

	command := os.Args[1]
	switch command {
	case "file":
		runFileDemo()
	case "async":
		runAsyncDemo()
	case "server":
		runServerDemo()
	default:
		fmt.Printf("Unknown command: %s\n", command)
	}
}

// ==========================================
// Part 1: File Operations (write.js equivalent)
// ==========================================
func runFileDemo() {
	fmt.Println("=== File Append and Read Demo (Node.js write.js equivalent) ===")
	filePath := "./text.txt"

	// 1. Append text to file (like fs.appendFile)
	// Open file in Append/Create/WriteOnly modes. Permission: 0644
	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatalf("Error opening/creating file: %v", err)
	}

	fmt.Println("Appending data to text.txt...")
	_, err = file.WriteString("hellp bithcesss\n")
	if err != nil {
		file.Close()
		log.Fatalf("Error writing to file: %v", err)
	}
	file.Close() // Close immediately to release the file handle

	// 2. Read file as a stream (like fs.createReadStream)
	fmt.Println("Reading stream from text.txt:")
	readStream, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("Error opening file for reading: %v", err)
	}
	defer readStream.Close()

	// Read in chunks using a buffer (simulating 'data' chunks events in Node)
	buf := make([]byte, 1024)
	for {
		n, err := readStream.Read(buf)
		if err == io.EOF {
			break // End of file reached
		}
		if err != nil {
			log.Fatalf("Error reading chunk: %v", err)
		}
		// n is the number of bytes read in this chunk
		fmt.Printf("[Chunk received (%d bytes)]: %s", n, string(buf[:n]))
	}

	// 3. Pipe streams (ReadStream.pipe(WriteStream) equivalent)
	fmt.Println("\n--- Stream Piping Demo (ReadStream.pipe(WriteStream) equivalent) ---")
	srcFile, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("Error opening source file: %v", err)
	}
	defer srcFile.Close()

	dstPath := "./output.txt"
	dstFile, err := os.Create(dstPath)
	if err != nil {
		log.Fatalf("Error creating destination file: %v", err)
	}
	defer dstFile.Close()

	// io.Copy streams all data from a Reader (srcFile) to a Writer (dstFile)
	written, err := io.Copy(dstFile, srcFile)
	if err != nil {
		log.Fatalf("Error piping streams: %v", err)
	}
	fmt.Printf("Piped %d bytes from %s to %s\n", written, filePath, dstPath)

	// Clean up / Unlink (like fs.unlink)
	fmt.Println("\nDeleting temporary files...")
	if err := os.Remove(dstPath); err != nil {
		log.Printf("Error deleting output.txt: %v", err)
	} else {
		fmt.Println("Deleted output.txt")
	}
}

// ==========================================
// Part 2: Promises & Async/Await (stream.js equivalent)
// ==========================================

// Helper to simulate Node's setTimeout/Promise combination using a Channel
func delay(ms time.Duration, word string) <-chan string {
	ch := make(chan string)
	go func() {
		time.Sleep(ms * time.Millisecond)
		ch <- word
		close(ch) // Close channel when done
	}()
	return ch
}

// Order flow steps returning errors (analogous to Promise resolve/reject)
func createOrder() error {
	time.Sleep(200 * time.Millisecond) // Simulate delay
	fmt.Println("✔ Order created")
	return nil
}

func checkInventory() error {
	time.Sleep(200 * time.Millisecond)
	fmt.Println("✔ Inventory checked")
	// Return an error here if you want to test failure/catch propagation:
	// return fmt.Errorf("inventory check failed: out of stock")
	return nil
}

func payment() {
	fmt.Println("✔ Payment processed")
}

func invoice() {
	fmt.Println("✔ Invoice generated")
}

func runAsyncDemo() {
	fmt.Println("=== Async, Delays, and Promises Demo (Node.js stream.js equivalent) ===")

	// 1. Simple delay (like: delay(1000, "Hello").then(console.log))
	fmt.Println("Waiting for delay channel...")
	word := <-delay(1000, "Hello World from Go channel!")
	fmt.Println("Received delayed message:", word)

	// 2. Sequential Flow (like: createOrder().then(checkInventory).then(payment).then(invoice).catch(err))
	fmt.Println("\nRunning sequential tasks (analogous to .then().catch()):")
	
	// In Go, asynchronous or synchronous chains are typically handled sequentially and explicitly.
	if err := createOrder(); err != nil {
		fmt.Println("Error in createOrder (catch):", err)
		return
	}

	if err := checkInventory(); err != nil {
		fmt.Println("Error in checkInventory (catch):", err)
		return
	}

	payment()
	invoice()

	// 3. Parallel tasks (Promise.all equivalent) using sync.WaitGroup
	fmt.Println("\nRunning parallel tasks (Promise.all equivalent):")
	var wg sync.WaitGroup
	wg.Add(2) // We are waiting for 2 goroutines

	go func() {
		defer wg.Done()
		time.Sleep(300 * time.Millisecond)
		fmt.Println("✔ Parallel Task A complete")
	}()

	go func() {
		defer wg.Done()
		time.Sleep(100 * time.Millisecond)
		fmt.Println("✔ Parallel Task B complete")
	}()

	wg.Wait() // Block until both call wg.Done()
	fmt.Println("All parallel tasks complete!")
}

// ==========================================
// Part 3: HTTP Server with SSE (stream.js Express equivalent)
// ==========================================
func runServerDemo() {
	fmt.Println("=== SSE HTTP Streaming Server ===")
	fmt.Println("Server is starting on http://localhost:4000")
	fmt.Println("To test, run in another terminal: curl -N http://localhost:4000/stream")

	http.HandleFunc("/stream", func(w http.ResponseWriter, r *http.Request) {
		// Set headers for Server-Sent Events (SSE)
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Cast response writer to http.Flusher so we can flush data stream chunks immediately
		flusher, ok := w.(http.Flusher)
		if !ok {
			http.Error(w, "Streaming unsupported by browser/client!", http.StatusInternalServerError)
			return
		}

		// Send initial response chunk
		fmt.Fprintf(w, "data: hi body how you doing \n\n")
		flusher.Flush()

		// Set up an interval (like setInterval in JavaScript)
		ticker := time.NewTicker(2 * time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-r.Context().Done():
				// Client disconnected (equivalent to req.on('close'))
				fmt.Println("Client connection closed. Cleaning up interval/ticker...")
				return

			case <-ticker.C:
				// Build a JSON payload (equivalent to JSON.stringify)
				data := map[string]interface{}{
					"num":     rand.Float64(),
					"time":    time.Now().UTC().Unix(),
					"message": "bitches",
				}
				jsonData, err := json.Marshal(data)
				if err != nil {
					log.Printf("JSON serialization error: %v", err)
					return
				}

				// Write and flush the event data
				fmt.Fprintf(w, "data: hiii %s hiii\n\n", jsonData)
				flusher.Flush()
			}
		}
	})

	// Home route
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello from Go Server! Go to /stream for SSE.")
	})

	if err := http.ListenAndServe(":4000", nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}