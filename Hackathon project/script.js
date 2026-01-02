let peopleCount = 0;
let batchSize = 10;
let batchNo = 1;
let darshanTime = 10; // demo
let countInterval;
let timerInterval;

function logMessage(msg) {
    let logList = document.getElementById("logList");
    let li = document.createElement("li");
    li.innerText = msg;
    logList.appendChild(li);
}

function startSystem() {

    // Reset batch
    peopleCount = 0;
    darshanTime = 10;

    document.getElementById("count").innerText = 0;
    document.getElementById("batchNo").innerText = batchNo;
    document.getElementById("timer").innerText = "--";

    document.getElementById("entryEsc").innerText = "ON";
    document.getElementById("exitEsc").innerText = "OFF";

    logMessage(`Batch ${batchNo} started. Entry Escalator ON`);

    countInterval = setInterval(() => {

        if (peopleCount < batchSize) {
            peopleCount++;
            document.getElementById("count").innerText = peopleCount;
            updateCrowdStatus();
            logMessage(`Person entered. Count = ${peopleCount}`);
        }

        if (peopleCount === batchSize) {
            clearInterval(countInterval);
            logMessage("Batch full (10/10). Starting darshan.");
            startDarshan();
        }

    }, 1000);
}

function updateCrowdStatus() {
    let status = document.getElementById("crowdStatus");

    if (peopleCount <= 4) {
        status.innerText = "LOW";
        status.className = "low";
    } else if (peopleCount <= 7) {
        status.innerText = "MEDIUM";
        status.className = "medium";
    } else {
        status.innerText = "HIGH";
        status.className = "high";
    }
}

function startDarshan() {
    document.getElementById("timer").innerText = darshanTime;

    timerInterval = setInterval(() => {
        darshanTime--;
        document.getElementById("timer").innerText = darshanTime;

        if (darshanTime === 0) {
            clearInterval(timerInterval);
            endDarshan();
        }
    }, 1000);
}

function endDarshan() {
    document.getElementById("entryEsc").innerText = "OFF";
    document.getElementById("exitEsc").innerText = "ON";

    logMessage(`Batch ${batchNo} darshan completed. Exit Escalator ON`);

    setTimeout(() => {
        batchNo++;
        logMessage("Preparing next batch...");
        startSystem();
    }, 3000);
}