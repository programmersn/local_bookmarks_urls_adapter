console.log ("Entering adapt_url.js ...");

/* ------------------- Beginning of execution flow ----------------------*/

console.log ("Getting Background Page ...");

let backgroundPage = browser.extension.getBackgroundPage();

document.getElementById("adapt-urls-form").addEventListener(
    "submit",
    function (ev) {
        console.log ("Entering callback attached to submit button ...");
        const oldprefix = document.getElementById("old-prefix").value;
        const newprefix = document.getElementById("new-prefix").value;

        //backgroundPage.adaptUrls(oldprefix, newprefix);
        backgroundPage.execute();
        ev.preventDefault();
    }
);