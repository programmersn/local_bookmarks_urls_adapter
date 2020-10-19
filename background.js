async function adaptUrls(oldprefix, newprefix) {
    console.log(`Entering adaptUrls function with oldprefix=${oldprefix} and newprefix=${newprefix}`);

    console.group("testing regexes");

    const str = "file:///media/programmersn/NOUAIM/Studies/Documentation/Computer_science/Cybersecurity/Reverse_Engineering-Binary_Analysis-Exploitation/Learning%20Linux%20Binary%20Analysis_2016.pdf"
    if (str.startsWith(oldprefix)) {
        const res = str.replace(oldprefix, newprefix);
        console.log(`${str} replaced with ${res}`);
    }
    
    console.groupEnd();

}

/*---------------------- Beginning flow of execution ------------------- */

console.log("Entering background.js");

browser.browserAction.onClicked.addListener(
    function () {
        console.log("Creating adapt_urls tab ...")
        browser.tabs.create({ "url": "/adapt_urls.html" });
    }
);