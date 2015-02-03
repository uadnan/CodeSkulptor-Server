// CodeSkulptor HTTP Request Listener

// Author: Adnan Umer <u.adnan@outlook.com>
// Dated: 3 February, 2015

package codeskulptor

import (
	"net/http"
	"os"
	"fmt"	
	"syscall"
	"path"
	"strings"
	"unsafe"
	"unicode/utf16"
	"time"
	"strconv"
)

// [BEGIN] Windows specific operations
var (
	kernel                = syscall.MustLoadDLL("kernel32.dll")
	getModuleFileNameProc = kernel.MustFindProc("GetModuleFileNameW")
)

func getExePath() string {
	exe, _ := getModuleFileName()   
	path, _ := path.Split(strings.Replace(exe, "\\", "/", -1))  
	return path
}

func getModuleFileName() (string, error) {
	var n uint32
	b := make([]uint16, syscall.MAX_PATH)
	size := uint32(len(b))

	r0, _, e1 := getModuleFileNameProc.Call(0, uintptr(unsafe.Pointer(&b[0])), uintptr(size))
	n = uint32(r0)
	if n == 0 {
		return "", e1
	}
	return string(utf16.Decode(b[0:n])), nil
}
// [END]

var exePath string = getExePath();
var storageFolder string = exePath + "storage/";

/*
 * Checks wheather specified files exits
 */
func fileExists(file string) bool {

	_, err := os.Stat(file);
	return !os.IsNotExist(err);
}

func log(line string) {

	fmt.Printf(time.Now().Local().Format(time.RFC822) + " " + line + "\n");
}

/*
 * Handles HTTP Request for /storage/
 */
func storageHandler(w http.ResponseWriter, req *http.Request) {

	// We are only going to send python scripts in response if any
	w.Header().Set("Content-Type", "text/plain")

	requestedFile := storageFolder + req.URL.Path[1:];
	hasFile := fileExists(requestedFile)

	switch (req.Method) {

		case "HEAD":
			if (hasFile) {

				// OK
				log("[HEAD] 200 " + requestedFile)

			} else {

				// NOT FOUND
				http.NotFound(w, req)
				log("[HEAD] 404" + requestedFile)

			}
			break;
		case "GET":

			if (hasFile) {

				// OK
				http.ServeFile(w, req, requestedFile)
				log("[GET] 200" + requestedFile)

			} else {

				// NOT FOUND
				http.NotFound(w, req)
				log("[GET] 404" + requestedFile)
			}
			break;
		case "POST":

			file := req.FormValue("path")
			code := req.FormValue("code")

			if (!hasFile) {

				f, err := os.Create(storageFolder + file)
				if err != nil {
					// Failed to ceate File
					http.Error(w, err.Error(), 500)
					log("[POST] 500 " + requestedFile);
					log("\tError creating file" + err.Error());
				} else {

					// Write content to file
					f.WriteString(code);
					f.Close();
				}

			} else {

				// File already exists
				http.Error(w, "A file with specified name already exists", 403)
				log("[POST] 403" + requestedFile)
				log("\tSpecified File already exists");
			}
			break;
	}

}

func Listen(port int) {
	
	http.HandleFunc("/storage/", storageHandler)
	http.Handle("/", http.FileServer(http.Dir(exePath) + "html/"))
	
	if err := http.ListenAndServe(":" + strconv.Itoa(port), nil); err != nil {
		log("[ERROR]: " + err.Error())
	}
}