from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)


REGION_DATA = {
    "Mumbai": {
        "carbon_before": 520,
        "carbon_after": 310,
        "energy_after": 48,
        "cost_after": 36500
    },
    "Hyderabad": {
        "carbon_before": 485,
        "carbon_after": 295,
        "energy_after": 46,
        "cost_after": 35200
    },
    "Bengaluru": {
        "carbon_before": 450,
        "carbon_after": 270,
        "energy_after": 43,
        "cost_after": 34800
    },
    "Delhi": {
        "carbon_before": 610,
        "carbon_after": 380,
        "energy_after": 55,
        "cost_after": 38900
    },
    "Chennai": {
        "carbon_before": 500,
        "carbon_after": 305,
        "energy_after": 47,
        "cost_after": 36000
    }
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/optimize")
def optimize():
    region = request.args.get("region", "Mumbai")

    if region not in REGION_DATA:
        region = "Mumbai"

    region_values = REGION_DATA[region]

    response_data = {
        "status": "Optimized",
        "selected_region": region,
        "storage_usage": 58,
        "carbon_intensity": region_values["carbon_after"],
        "energy_usage": region_values["energy_after"],
        "monthly_cost": region_values["cost_after"],
        "storage_efficiency": 89,
        "selected_action": (
            "AI selected carbon-aware storage migration, data compression, "
            "backup scheduling, replication control, and resource scaling."
        ),
        "node_updates": [
            {
                "node": "Cloud Node A",
                "region": "Mumbai",
                "accuracy": random.randint(84, 92),
                "status": "Local model update sent"
            },
            {
                "node": "Cloud Node B",
                "region": "Hyderabad",
                "accuracy": random.randint(82, 90),
                "status": "Local model update sent"
            },
            {
                "node": "Cloud Node C",
                "region": "Bengaluru",
                "accuracy": random.randint(86, 94),
                "status": "Local model update sent"
            }
        ],
        "chart_data": {
            "cost": {
                "before": 52000,
                "after": region_values["cost_after"]
            },
            "energy": {
                "before": 92,
                "after": region_values["energy_after"]
            },
            "carbon": {
                "before": region_values["carbon_before"],
                "after": region_values["carbon_after"]
            },
            "storage": {
                "before": 76,
                "after": 58
            }
        },
        "report": {
            "storage_cost_before": "₹52,000",
            "storage_cost_after": f"₹{region_values['cost_after']:,}",
            "energy_before": "92 kWh",
            "energy_after": f"{region_values['energy_after']} kWh",
            "carbon_before": f"{region_values['carbon_before']} gCO₂/kWh",
            "carbon_after": f"{region_values['carbon_after']} gCO₂/kWh",
            "storage_before": "76%",
            "storage_after": "58%",
            "efficiency_before": "67%",
            "efficiency_after": "89%"
        }
    }

    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)