// Author: Adnan Umer <u.adnan@outlook.com>
// Dated: 3 February, 2015

package main

import (
    "os/exec"
    "fmt"
)

import "codeskulptor"

func main() {
    cmd := exec.Command("TITLE CodeSkulptor Server - localhost:2846")
    _ = cmd.Run()

    fmt.Printf("Starting CodeSkulotor Server...\n\n[WARNING] Don't Close this while using CodeSkulotor\n[INFO] Listening and Serving on localhost:2846\n")

    codeskulptor.OpenBrowser("http://localhost:2846/")
    codeskulptor.Listen(2846)
}