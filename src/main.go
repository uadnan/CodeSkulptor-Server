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
