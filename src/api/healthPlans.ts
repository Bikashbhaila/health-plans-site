import type { HealthPlan } from "../util/types.ts";

export async function fetchHealthPlans(): Promise<HealthPlan[]> {
    const response = await fetch('/health-plans.json');

    if (!response.ok) {
        throw new Error("Failed to load health plans...")
    }

    return response.json();
}
