// CodeSkulptor HTTP Request Listener

// Copyright (c) Adnan Umer <u.adnan@outlook.com>.
// All rights reserved. Follow me @MrAdnanUmer
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
// to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

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

	requestedFile := req.URL.Path[1:]
	file_path := storageFolder + req.URL.Path[9:];
	if (req.Method == "POST") {
		file_path += req.FormValue("path")
	}

	hasFile := fileExists(file_path)

	switch (req.Method) {

		case "HEAD":
			if (hasFile) {

				// OK
				log("[HEAD] 200 " + requestedFile)

			} else {

				// NOT FOUND
				http.NotFound(w, req)
				log("[HEAD] 404 " + requestedFile)

			}
			break;
		case "GET":

			if (hasFile) {

				// OK
				http.ServeFile(w, req, file_path)
				log("[GET] 200 " + requestedFile)

			} else {

				// NOT FOUND
				http.NotFound(w, req)
				log("[GET] 404 " + requestedFile)
			}
			break;
		case "POST":

			file := req.FormValue("path")
			code := req.FormValue("code")
			requestedFile += file

			if (hasFile) {

				// File already exists
				http.Error(w, "A file with specified name already exists", 403)
				log("[POST] 403 " + requestedFile)
				log("[ERROR] Specified File already exists");

			} else {

				f, err := os.Create(storageFolder + file)
				if err != nil {
					// Failed to ceate File
					http.Error(w, err.Error(), 500)
					log("[POST] 500 " + requestedFile);
					log("[ERROR] Error creating file: " + err.Error());

				} else {

					log("[POST] 200 " + requestedFile);
					// Write content to file
					f.WriteString(code);
					f.Close();
				}

			}
			break;
	}

}

func Listen(port int) {
	
	http.HandleFunc("/storage/", storageHandler)
	http.HandleFunc("/fetch/", UrlLib2Handler)
	http.Handle("/", http.FileServer(http.Dir(exePath) + "html/"))

	log("[INFO] Listening and Serving on localhost:" + strconv.Itoa(port))
	
	if err := http.ListenAndServe(":" + strconv.Itoa(port), nil); err != nil {
		log("[ERROR]: " + err.Error())
	}
}
