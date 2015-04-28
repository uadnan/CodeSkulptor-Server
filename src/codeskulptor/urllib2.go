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
	"io"
	"io/ioutil"
	"strconv"
)

/*
 * Handles HTTP Request for /fetch/
 */
func UrlLib2Handler(w http.ResponseWriter, req *http.Request) {

	client := &http.Client { }

	url := req.FormValue("url")

	wReq, err := http.NewRequest(req.Method, url, nil)
	resp, err := client.Do(wReq)

	if err != nil {
		log("[FETCH] " + url + ", Error: " + err.Error())
		http.Error(w, err.Error(), 403)
		return
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	
	w.WriteHeader(resp.StatusCode)
	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	io.WriteString(w, string(body))
	log("[FETCH] " + strconv.Itoa(resp.StatusCode) + " " + url)
}