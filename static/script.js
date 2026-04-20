let isRunning = false;
let latestReport = null;

let costChart = null;
let energyChart = null;
let carbonChart = null;
let storageChart = null;

function getTime() {
    return new Date().toLocaleTimeString();
}

function addLog(message) {
    const logBox = document.getElementById("logBox");
    const line = document.createElement("p");
    line.innerText = `[${getTime()}] ${message}`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
}

function clearLogs() {
    document.getElementById("logBox").innerHTML =
        "<p>[System] Waiting for optimization process...</p>";
}

function selectAction(actionText) {
    document.getElementById("selectedAction").innerText = actionText;
    addLog("Manual action selected: " + actionText);
}

function updateProgress(percent, text, activeStep) {
    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText = text;

    for (let i = 1; i <= 6; i++) {
        const step = document.getElementById("step" + i);

        if (i < activeStep) {
            step.classList.add("completed");
            step.classList.remove("active");
        } else if (i === activeStep) {
            step.classList.add("active");
            step.classList.remove("completed");
        } else {
            step.classList.remove("active");
            step.classList.remove("completed");
        }
    }
}

function createBarChart(canvasId, label, beforeValue, afterValue) {
    const ctx = document.getElementById(canvasId);

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Before", "After"],
            datasets: [{
                label: label,
                data: [beforeValue, afterValue],
                backgroundColor: ["#ef4444", "#34d399"],
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#e5e7eb"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#cbd5e1"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                },
                y: {
                    ticks: {
                        color: "#cbd5e1"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                }
            }
        }
    });
}

function destroyCharts() {
    if (costChart) costChart.destroy();
    if (energyChart) energyChart.destroy();
    if (carbonChart) carbonChart.destroy();
    if (storageChart) storageChart.destroy();
}

function updateCharts(chartData) {
    destroyCharts();

    costChart = createBarChart(
        "costChart",
        "Cost in ₹",
        chartData.cost.before,
        chartData.cost.after
    );

    energyChart = createBarChart(
        "energyChart",
        "Energy in kWh",
        chartData.energy.before,
        chartData.energy.after
    );

    carbonChart = createBarChart(
        "carbonChart",
        "Carbon gCO₂/kWh",
        chartData.carbon.before,
        chartData.carbon.after
    );

    storageChart = createBarChart(
        "storageChart",
        "Storage Usage %",
        chartData.storage.before,
        chartData.storage.after
    );
}

function updateDashboard(data) {
    latestReport = data;

    document.getElementById("systemStatus").innerText = data.status;
    document.getElementById("storageUsage").innerText = data.storage_usage;
    document.getElementById("carbonIntensity").innerText = data.carbon_intensity;
    document.getElementById("energyUsage").innerText = data.energy_usage;
    document.getElementById("monthlyCost").innerText = data.monthly_cost;

    document.getElementById("selectedAction").innerText = data.selected_action;

    document.getElementById("costAfter").innerText = data.report.storage_cost_after;
    document.getElementById("energyAfter").innerText = data.report.energy_after;
    document.getElementById("carbonBefore").innerText = data.report.carbon_before;
    document.getElementById("carbonAfter").innerText = data.report.carbon_after;
    document.getElementById("storageAfter").innerText = data.report.storage_after;
    document.getElementById("efficiencyAfter").innerText = data.report.efficiency_after;

    document.getElementById("nodeAStatus").innerText =
        "Status: " + data.node_updates[0].status + " | Accuracy: " +
        data.node_updates[0].accuracy + "%";

    document.getElementById("nodeBStatus").innerText =
        "Status: " + data.node_updates[1].status + " | Accuracy: " +
        data.node_updates[1].accuracy + "%";

    document.getElementById("nodeCStatus").innerText =
        "Status: " + data.node_updates[2].status + " | Accuracy: " +
        data.node_updates[2].accuracy + "%";

    updateCharts(data.chart_data);
}

function runOptimization() {
    if (isRunning) {
        addLog("Optimization already running. Please wait.");
        return;
    }

    isRunning = true;
    clearLogs();

    const selectedRegion = document.getElementById("regionSelect").value;

    addLog("Selected cloud region: " + selectedRegion);
    updateProgress(5, "Starting closed-loop optimization...", 1);
    addLog("Closed-loop optimization initialized.");

    setTimeout(() => {
        updateProgress(
            20,
            "Collecting cloud storage, workload, cost, energy, and carbon data...",
            1
        );
        addLog("Collecting cloud storage metadata.");
        addLog("Collecting workload and access frequency data.");
        addLog("Collecting carbon intensity for selected region.");
    }, 800);

    setTimeout(() => {
        updateProgress(
            38,
            "Training local AI models at distributed cloud nodes...",
            2
        );
        addLog("Cloud Node A local model training started.");
        addLog("Cloud Node B local model training started.");
        addLog("Cloud Node C local model training started.");
    }, 1900);

    setTimeout(() => {
        updateProgress(
            56,
            "Sending only model updates to federated learning aggregator...",
            3
        );
        addLog("Raw cloud data remains inside local nodes.");
        addLog("Only model updates are sent to federated aggregator.");
        addLog("Global AI model generated successfully.");
    }, 3100);

    setTimeout(() => {
        updateProgress(
            74,
            "Checking carbon intensity and selecting low-carbon optimization policy...",
            4
        );
        addLog("Carbon-aware decision engine activated.");
        addLog("Low-carbon storage and backup policy selected.");
    }, 4300);

    setTimeout(() => {
        updateProgress(
            88,
            "Executing storage migration, compression, replication control, and resource scaling...",
            5
        );
        addLog("Executing storage tier migration.");
        addLog("Compressing old and duplicate data.");
        addLog("Scheduling backup during low-carbon period.");
        addLog("Scaling cloud resources based on workload demand.");
    }, 5500);

    setTimeout(() => {
        fetch(`/optimize?region=${selectedRegion}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Optimization API failed");
                }
                return response.json();
            })
            .then(data => {
                updateDashboard(data);

                updateProgress(
                    100,
                    "Optimization completed successfully. Feedback sent to AI model.",
                    6
                );

                document.getElementById("step6").classList.add("completed");

                addLog("Optimization completed successfully.");
                addLog("Feedback sent to local AI models.");
                addLog("Dashboard and charts updated.");
                addLog("Final report generated.");

                isRunning = false;
            })
            .catch(error => {
                console.error(error);
                addLog("Error while running optimization. Check Flask server.");
                document.getElementById("progressText").innerText =
                    "Error while running optimization.";
                isRunning = false;
            });
    }, 6900);
}

function resetDashboard() {
    isRunning = false;
    latestReport = null;

    document.getElementById("systemStatus").innerText = "Monitoring";
    document.getElementById("storageUsage").innerText = "76";
    document.getElementById("carbonIntensity").innerText = "520";
    document.getElementById("energyUsage").innerText = "92";
    document.getElementById("monthlyCost").innerText = "52000";

    document.getElementById("selectedAction").innerText =
        "No optimization action selected yet.";

    document.getElementById("costAfter").innerText = "Not optimized";
    document.getElementById("energyAfter").innerText = "Not optimized";
    document.getElementById("carbonBefore").innerText = "520 gCO₂/kWh";
    document.getElementById("carbonAfter").innerText = "Not optimized";
    document.getElementById("storageAfter").innerText = "Not optimized";
    document.getElementById("efficiencyAfter").innerText = "Not optimized";

    document.getElementById("nodeAStatus").innerText = "Status: Local model ready";
    document.getElementById("nodeBStatus").innerText = "Status: Local model ready";
    document.getElementById("nodeCStatus").innerText = "Status: Local model ready";

    document.getElementById("progressFill").style.width = "0%";
    document.getElementById("progressText").innerText =
        "Waiting to start optimization...";

    for (let i = 1; i <= 6; i++) {
        const step = document.getElementById("step" + i);
        step.classList.remove("active");
        step.classList.remove("completed");
    }

    clearLogs();
    destroyCharts();

    addLog("Dashboard reset completed.");
}

function downloadReport() {
    if (!latestReport) {
        alert("Please run optimization first before downloading report.");
        return;
    }

    const reportText = `
CloudAI GreenOps Optimization Report
------------------------------------

Selected Region: ${latestReport.selected_region}
System Status: ${latestReport.status}

Optimization Action:
${latestReport.selected_action}

Before and After Report:
Storage Cost: ${latestReport.report.storage_cost_before} -> ${latestReport.report.storage_cost_after}
Energy Usage: ${latestReport.report.energy_before} -> ${latestReport.report.energy_after}
Carbon Intensity: ${latestReport.report.carbon_before} -> ${latestReport.report.carbon_after}
Storage Usage: ${latestReport.report.storage_before} -> ${latestReport.report.storage_after}
Storage Efficiency: ${latestReport.report.efficiency_before} -> ${latestReport.report.efficiency_after}

Federated Learning Node Updates:
${latestReport.node_updates[0].node} (${latestReport.node_updates[0].region}) - ${latestReport.node_updates[0].status}, Accuracy: ${latestReport.node_updates[0].accuracy}%
${latestReport.node_updates[1].node} (${latestReport.node_updates[1].region}) - ${latestReport.node_updates[1].status}, Accuracy: ${latestReport.node_updates[1].accuracy}%
${latestReport.node_updates[2].node} (${latestReport.node_updates[2].region}) - ${latestReport.node_updates[2].status}, Accuracy: ${latestReport.node_updates[2].accuracy}%

Closed Loop:
Monitor -> Analyze -> Decide -> Execute -> Feedback
`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cloudai_greenops_optimization_report.txt";
    link.click();

    addLog("Optimization report downloaded.");
}