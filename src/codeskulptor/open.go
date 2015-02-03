// Author: Adnan Umer <u.adnan@outlook.com>
// Dated: 3 February, 2015

package codeskulptor

import (
	"os/exec"
)

// Opens specified url inside preffered web brower
func OpenBrowser(url string) {

	cmd := exec.Command(exePath + "RunBrowser.bat", url)
    err := cmd.Run()

    if (err != nil) {
        log("[ERROR] " + err.Error())
    }
}