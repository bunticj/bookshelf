import { appendFile } from "fs";
const obj: any = {
    passed: { counter: 0, fileName: "./passed-tests.txt" },
    failed: { counter: 0, fileName: "./failed-tests.txt" },
};

afterEach(function () {
    const testKey = this.currentTest!.fullTitle();
    const state = this.currentTest?.state;
    if (state && obj[state]) {
        obj[state].counter++;
        appendFile(obj[state].fileName, `${new Date().toISOString()} - ${obj[state].counter}: ${testKey} - ${state}\n`, function (err) {
            if (err) throw err;
        });
    }
});
after(() => {
    setTimeout(() => {
        process.exit();
    }, 2000)

})
