package main

import (
    "log"
    "net/http"
    "syscall"
    "unicode/utf16"
    "unsafe"
    "path"  
    "os"
    "os/exec"
    "strings"
    "fmt"
)

func fileExist(file string) bool {
    _, err := os.Stat(file);
    return !os.IsNotExist(err)  
}

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

func handler(w http.ResponseWriter, req *http.Request) {
    w.Header().Set("Content-Type", "text/plain")    
    absPath := exePath + "storage/"
    if req.Method == "HEAD" {

        if (!fileExist(absPath + req.URL.Path)) {
            http.NotFound(w, req)
        }
        
    } else if req.Method == "GET" {
        
        http.ServeFile(w, req, exePath + req.URL.Path[1:])
        fmt.Printf("[GET] " + exePath + req.URL.Path[1:] + "\n")

    } else if req.Method == "POST" {
        
        file := req.FormValue("path")
        code := req.FormValue("code")
        f, err := os.Create(absPath + file)

        fmt.Printf("[POST] " + absPath + file + "\n")

        if err != nil {
            http.Error(w, err.Error(), 500)
            return
        } else {
            f.WriteString(code)
            f.Close()
        }
    }
}

var exePath string = getExePath()

func main() {
    cmd := exec.Command("TITLE CodeSkulptor Server - localhost:2846")
    _ = cmd.Run()

    fmt.Printf("Starting CodeSkulotor Server...\n\n[WARNING] Don't Close this while using CodeSkulotor\n[INFO] Listening and Serving on localhost:2846\n")
    cmd = exec.Command(exePath + "CodeSkulptorServer.bat")
    err := cmd.Run()
    if (err != nil) {
        fmt.Printf("[ERROR] " + err.Error())
    }

    http.HandleFunc("/storage/", handler)
    http.Handle("/", http.FileServer(http.Dir(exePath) + "html/"))
    if err = http.ListenAndServe(":2846", nil); err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}